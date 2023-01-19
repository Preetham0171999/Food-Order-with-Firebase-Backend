import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect ,useState} from 'react';


const AvailableMeals = () => {

  const [meals,setmeals]=useState([]);
  const[isLoading,setisLoading]=useState(true);
  const[httpError,setHttpError]=useState();
  useEffect(()=>{
    
    const FetchMeals= async()=>{
      const response=await fetch("https://react-http-6df0f-default-rtdb.firebaseio.com/meals.json");
      if(!response.ok){
        throw new Error("something went wrong")
      }
      const responseData=await response.json();
      const loadedMeals = [];

      for(const key in responseData){
        loadedMeals.push({
          id:key,
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price

        })
      }
      setmeals(loadedMeals)
      setisLoading(false)

    };
    
    FetchMeals().catch(error=>{
      setisLoading(false);
      setHttpError(error.message);
    });
        
  },[]);

  if(isLoading){
    return <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
  }

  if(httpError){
    return<section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
  }


  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
