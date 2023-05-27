import YouTube from "react-youtube";
import styles from "@/styles/YoutubeVideo.module.css";
const YoutubeVideo = ({ url }) => {
  const videoId = url.includes("v=")
    ? url.split("v=")[1]
    : url.split("/").pop();

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className={styles.container}>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default YoutubeVideo;
