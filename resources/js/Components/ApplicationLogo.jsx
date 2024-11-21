export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/logomusic.png" // Path to the image in the public folder
            alt="Application Logo"
        />
    );
}
