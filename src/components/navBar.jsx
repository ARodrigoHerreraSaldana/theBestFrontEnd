import '../components/navBar.css'
const Navbar = ({children}) => {
    return(<>
    <header>
        <nav>
            <div className="navbar">
                <ul className="menuHeader">
                    <li>
                        Home
                    </li>
                    <li>
                        Blog
                    </li>
                    <li>
                        Projects
                    </li>
                    <li>
                        About
                    </li>
                    <li>
                        Contact
                    </li>
                </ul>
            </div>
        </nav>
        <main>
            {children}
        </main>
        </header>
        </>
    )
    
}

export default Navbar