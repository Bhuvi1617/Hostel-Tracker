import Recat ,{useState} from 'react';
import axios from 'axios';

const FoodLogger = () => {
    const [meal,setMeal] = useState('');
    const [mood,setMood] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.post('/api/foodentry',{meal,mood});
            setMeal('');
            setMood('');
        } catch (error) {
            console.log("Food could not be logged",error);
        }
    };

    return (
        <div>
            <h1>Food Logger</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={meal} onChange={(e) => setMeal(e.target.value)} placeholder="Enter Meal"
                required/>

                <input type="text" value={mood} onChange={(e) => setMood(e.target.value)} placeholder="Enter Mood"
                required/>
                <button type="submit">Log</button>
            </form>
        </div>
    );

};

export default FoodLogger