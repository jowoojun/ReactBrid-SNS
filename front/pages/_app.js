import AppLayout from '../src/AppLayout'
import PropTypes from 'prop-types'
import Head from 'next/head'

const App = ({ Component }) => {
  return(
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>React Twitter</title>
      </Head>
      <div>공통사항</div>
      <Component />
      
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default App;