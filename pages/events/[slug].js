import Layout from '@/components/Layout';
import EventMap from '@/components/EventMap';
import { API_URL } from '../../config/index';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { Router, useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';

export default function EventPage({ evt }) {
	const router = useRouter();

	return (
		<Layout>
			<span>
				{new Date(evt.date).toLocaleDateString('en-GB')} at {evt.time}
			</span>
			<h1>{evt.name}</h1>
			<ToastContainer />
			{evt.image && (
				<div className={styles.image}>
					<Image src={evt.image.formats.medium.url} width={960} height={600} />
				</div>
			)}
			<h3>Performers:</h3>
			<p>{evt.performers}</p>
			<h3>Description:</h3>
			<p>{evt.description}</p>
			<h3>Venue: {evt.venue}</h3>
			<p>{evt.address}</p>

			<EventMap evt={evt} />

			<Link href='/events'>
				<a className={styles.back}>Go Back</a>
			</Link>
		</Layout>
	);
}

export async function getServerSideProps({ query: { slug } }) {
	const res = await fetch(`${API_URL}/events?slug=${slug}`);
	const events = await res.json();
	return {
		props: {
			evt: events[0],
		},
	};
}
