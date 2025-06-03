import { Favorite } from "@mui/icons-material";


interface Props {
  healthRating: number
}

const HealthRating = (props: Props) => {
  const { healthRating } = props;
  switch (healthRating) {
    case 0:
      return <Favorite style={{color: "#00cc00"}}/>;
    case 1:
      return <Favorite style={{color: "#ffff00"}}/>;
    case 2:
      return <Favorite style={{color: "#ff6600"}}/>;
    case 3:
      return <Favorite style={{color: "#ff0000"}}/>;
    default:
      return null;
  }
};


export default HealthRating;