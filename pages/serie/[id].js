import {getRooms} from "@/pages/habitaciones";
import Layout from "@/components/Layout";
import Head from "next/head";

const getRoomById = (id) => {
    const allRooms = getRooms()
    return allRooms.find((room) => room.id === id)
}

export async function getServerSideProps(context) {
    const id = parseInt(context.params.id)
    const room = getRoomById(id)

    if (!room) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            room,
        },
    }
}

const SerieDetail = ({ serie }) => {
    return (
        <Layout>
            <Head>
                <title>Habitación | Hotel XYZ</title>
                <meta name="description" content="Breve descripción de la página, sus características y contenido." />
                <meta name="keywords" content="hotel, habitaciones, servicios, turismo, viajes" />
            </Head>
            <div>
                <h1>{room.name}</h1>
                <img src={room.image} alt={room.name} />
                <p>{room.location}</p>
                <p>{room.price} € / noche</p>
            </div>
        </Layout>
    )
}

export default SerieDetail;
