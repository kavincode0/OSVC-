const Navbar = ({show}) => {
    return(
        <div className = {show ? 'sidenav active' : 'sidenav'}>
            <ul>
                <li><a href="/">Home</a></li>

                <li><a href="/about">About</a></li>

                <li><a href="/contact">Contact Us</a></li>
            </ul>
        </div>
    )
}

export default Navbar 