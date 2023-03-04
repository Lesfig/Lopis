import List from "../components/List";
import { useParams } from 'react-router';

const Catalog = () => {
    const { category } = useParams();
    return(
        <>
            <List category ={category}></List>
        </>
    )

}
export default Catalog;