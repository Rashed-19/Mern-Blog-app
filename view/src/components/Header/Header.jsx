import "./header.css"

export default function Header () {
    return (
        <div className="header">
            <div className="headerTitle">
                <span className="headerTitleSm">MERN Stack</span>
                <span className="headerTitleLg">Blog App</span>
            </div>
            <img 
            className="headerImg" 
            src="https://wallup.net/wp-content/uploads/2019/09/830495-multi-monitor-dual-screen-widescreen.jpg" 
            alt="headerImage" />
        </div>
    )
}
