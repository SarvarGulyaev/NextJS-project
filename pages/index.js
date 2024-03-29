import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Slider from "../components/Slider";
import {ProductList} from "../components/ProductList";
import axios from "axios";
import {useState} from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";

export default function Home({data, admin}) {

    const [close, setClose] = useState(true)

  return (
    <div className={styles.container}>
      <Head>
          <title>Pizza Restaurant</title>
      </Head>
        <Slider />
        {
            admin && (
                <AddButton setClose={setClose} />
            )
        }
        <ProductList data={data} />
        {
            !close && <Add setClose={setClose} />
        }
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || ''
    let admin = false

    if(myCookie.token === process.env.TOKEN) {
        admin = true
    }

    const res = await axios.get('http://localhost:3000/api/products')

    return {
        props: {
            data: res.data,
            admin
        }
    }
}