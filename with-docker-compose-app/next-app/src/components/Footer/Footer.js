import classes from './css/Footer.module.css'; 
import { mainMenus } from '../../constants/main-menus'

function Footer() {
    return (
        <footer className={classes.footer}>
                <div className='container p-2'>
                    <div className='row mt-5 mb-5'> 
                        <div className='col-md-3 col-lg-2 col-xl-2 mx-auto'>
                            <h2 class="fw-bold mb-4 text-white">Blogr</h2>  
                        </div>
                        {mainMenus.map((footerMenu) => (
                            <div className="col-auto mx-auto" key={footerMenu.groupTitle}>
                                <h4 className='fw-bold mb-3 text-white'>
                                    {footerMenu.groupTitle}
                                </h4>
                                <ul className='list-unstyled text-white'>
                                    {footerMenu.subMenus.map((subMenu) => (
                                        <li className='mb-1' key={subMenu}>
                                            <a href={`/${subMenu}`}>{subMenu}</a>
                                        </li>   
                                    ))}    
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
        </footer>
    )
}

export default Footer; 
