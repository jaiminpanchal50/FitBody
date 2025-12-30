
import Banner from "../../components/Banner/Banner";
import bgvideo from "../../assets/bgVideo.mp4";
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard";
const Home = () => {
    

    return (
        <>
            <Banner
                tag="h1"
                title="Your fitness journey is a reflection of your discipline and dedication"
                description="Track every workout, measure your progress, and build sustainable habits that lead to long-term strength and confidence."
                btnText={"learn more"}
                link={"/"}
                bgVideo={bgvideo}
            />
            <WorkoutCard />

        </>
    );
};

export default Home;
