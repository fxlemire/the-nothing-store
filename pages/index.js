import Head from 'next/head';
import { useEffect } from 'react';

import styles from '../styles/Home.module.css';

let stripe;

export default function Home() {
  useEffect(() => {
    stripe = window.Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
  }, []);

  async function onShopClick() {
    try {
      const response = await fetch('/api/stripe', {
        method: 'POST',
      });
      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>The Nothing Store</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://js.stripe.com/v3/"></script>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>The Nothing Store</h1>
        <div className={styles.description}>
          <p>You get fucked.</p>
          <p>Period.</p>
        </div>

        <button
          id="checkout-button"
          className={styles.shop}
          onClick={onShopClick}
        >
          Shop Nothing Now
        </button>
      </main>
    </div>
  );
}
