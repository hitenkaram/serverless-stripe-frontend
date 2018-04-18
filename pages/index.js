import Layout from '../components/Layout';
import PayButton from '../components/PayButton';

export default () => (
  <Layout>
    <h1>Serverless Stripe Checkout</h1>
    <p>Use 4242 4242 4242 4242, and any CVC and future expiration date.</p>
    <PayButton amount={1500}/>
  </Layout>
);
