import { Link } from 'react-router-dom';

import styles from './Not-found.module.css';


export default function NotFound404() {

  return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className="text text_type_main-large">Oops! 404 Error</h1>
          <br/>
          <p className='text text_type_main-default'>The page you requested does not exist</p>
          <p className='text text_type_main-default'>check the address or try <Link to='/' className={`${styles.link} text text_type_main-default`}>homepage</Link></p>
        </div>
      </div>
  );
}