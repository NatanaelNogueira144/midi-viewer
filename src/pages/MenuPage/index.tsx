import Layout from "../../components/Layout";

export default function MenuPage() {
    return (
        <Layout>
            <h1>Welcome to MIDI Viewer!</h1>
            <br></br>
            <p>
                This is a simple <strong>MIDI Viewer</strong> that can be used to show MIDI content being executed 
                on a keyboard.
            </p>
            <p>
                To start, go on <strong>"Play a Song"</strong>, select your MIDI file, adjust the MIDI settings and 
                see the magic!
            </p>
            <p>Go to <strong>"Settings"</strong> if you want to change theme colors or the type of keyboard.</p>
            <p><strong>Enjoy and have fun!</strong></p>
        </Layout>
    );
}