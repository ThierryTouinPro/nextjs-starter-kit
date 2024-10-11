import classes from './footer.module.css'; 
import { mainMenus } from '../../constants/main-menus'

function Footer() {
    return (
        <footer className={classes.footer}>
                <div className='container p-2'>
                    <div className='row mt-5 mb-5'> 
                        <div className='col-md-3 col-lg-2 col-xl-2 mx-auto'>
                            <h4 class="fw-bold mb-4">Blogr</h4>  
                        </div>
                        {mainMenus.map((footerMenu) => (
                            <div className='col-md-3 col-lg-2 col-xl-2 mx-auto'key={footerMenu.groupTitle}>
                                <h6 className='fw-bold mb-3'>
                                    {footerMenu.groupTitle}
                                </h6>
                                {footerMenu.subMenus.map((subMenu) => (
                                    <p className='mb-1'>
                                        <a href={`/${subMenu}`}>{subMenu}</a>
                                    </p>   
                                ))}    
                                        
                            </div>
                        ))}
                    </div>
                </div>
        </footer>
    )
}

export default Footer; 
