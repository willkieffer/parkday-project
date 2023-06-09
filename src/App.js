import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  useLocation
} from "react-router-dom";

function Menus({ data }) {
  let query = useQuery();
  const menus = [];

  //This is the URL param service id
  const service_id = query.get("serviceid");

  data.forEach((item) => {
    let location = menus.findIndex((x) => {
      return x.props.menu_name === item.menu_name;
    });
    if (location === -1) {
      location = menus.push(
        <MenuTable key={item.menu_name} menu_name={item.menu_name} service_date={item.service_date} items={[item]} />
      ) - 1;
    } else {
      menus[location].props.items.push(item);
    }
  });

  return (
    <div className="App">
      <div className='Logo'>
        <a href="https://heyparkday.com/" >
          <img src="https://uploads-ssl.webflow.com/631e34a7c664e87aa16a0816/631e46f926ebf976ee3e3b85_Parkday%20Logo%20SVG.svg" alt='logo'></img>
        </a>
      </div>
      {menus}
      <Contact />
    </div>
  );
}

function MenuTable({ menu_name, service_date, items }) {
  let quantities = [];
  let rows = [];

  items.forEach((item) => {
    //to make sure only the already-created orders are shown
    if (new Date(item.meal_opt_in_created_date) <= Date.now()) {
      let location = rows.findIndex((x) => {
        return x.props.item_name === item.name;
      });
      if (location === -1) {
        quantities.push(1);
        rows.push(
          <MenuItem key={item.name} item_name={item.name} />
        );
      } else {
        quantities[location] = quantities[location] + 1;
      }
    }
  });

  rows = [];

  items.forEach((item) => {
    //to make sure only the already-created orders are shown
    if (new Date(item.meal_opt_in_created_date) <= Date.now()) {
      let location = rows.findIndex((x) => {
        return x.props.item_name === item.name;
      });
      if (location === -1) {
        rows.push(
          <MenuItem key={item.name} item_name={item.name} ingredients_array={item.ingredients_array} quantity={quantities[rows.length]} />
        );
      }
    }
  });


  return (
    <div>
      <div className='MenuTitle'>
        <h1>{menu_name}</h1>
        <h2>{service_date}</h2>
      </div>
      <div className='MenuSpace'>
        {rows}
      </div>
    </div>
  );
}

function MenuItem({ item_name, ingredients_array, quantity }) {
  return (
    <div className='MenuItem'>
      <h3>{item_name} ({quantity} total)</h3>
      <ItemIngredients ingredients_array={ingredients_array} />
    </div>
  );
}

function ItemIngredients({ ingredients_array }) {
  ingredients_array = ingredients_array.substring(1, ingredients_array.length - 1);

  return (
    <div>
      <p>Ingredients:</p>
      {ingredients_array}
    </div>
  );
}

function Contact() {
  return (
    <div className='Contact'>
      <h1>See something wrong? Delivery late? Let us know!</h1>
      <button onClick={() => window.location = 'mailto:order@heyparkday.com?subject=Problem With My Order'} className='ContactButton'>Contact Us</button>
    </div>
  );
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {
  return (
    <Router>
      <Menus data={RESPONSE} />
    </Router>
  );
}

export default App;

const RESPONSE = [
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 07:08:32.260943+00",
    name: "California Roll",
    menu_name: "Sushi Day",
    ingredients_array: "[Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce,  Fresh Ginger, Seaweed, Sushi Rice, Nori, Crab, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 1
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 07:08:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 2
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 07:08:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 3
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 07:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 4
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 07:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 5
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 08:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 6
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 08:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 7
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 08:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 8
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 09:08:32.260943+00",
    name: "California Roll",
    menu_name: "Sushi Day",
    ingredients_array: "[Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce,  Fresh Ginger, Seaweed, Sushi Rice, Nori, Crab, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 9
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 09:08:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 10
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 09:08:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 11
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 09:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 12
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 09:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 13
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 09:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 14
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 09:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 15
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 09:08:32.260943+00",
    name: "Spicy Tuna Roll",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 16
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 10:08:32.260943+00",
    name: "Avocado Veggie Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Avocado, Cucumber, Carrot, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 17
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 10:08:32.260943+00",
    name: "Avocado Veggie Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Avocado, Cucumber, Carrot, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 18
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 10:08:32.260943+00",
    name: "California Roll",
    menu_name: "Sushi Day",
    ingredients_array: "[Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce,  Fresh Ginger, Seaweed, Sushi Rice, Nori, Crab, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 19
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 10:08:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 20
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 10:08:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 21
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 10:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 22
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 10:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 23
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 10:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 24
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 10:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 25
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 10:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 26
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 10:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 27
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 10:08:32.260943+00",
    name: "Spicy Tuna Roll",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 28
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 11:08:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 29
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 11:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 30
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 11:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 31
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 11:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 32
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 11:08:32.260943+00",
    name: "Spicy Tuna Roll",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 33
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 11:08:32.260943+00",
    name: "Spicy Tuna Roll",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 34
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 11:12:32.260943+00",
    name: "California Roll",
    menu_name: "Sushi Day",
    ingredients_array: "[Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce,  Fresh Ginger, Seaweed, Sushi Rice, Nori, Crab, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 35
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 11:12:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 36
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 11:12:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 37
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 11:12:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 38
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 11:12:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 39
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 11:12:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 40
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 11:12:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 41
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 11:12:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 42
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 11:12:32.260943+00",
    name: "Spicy Tuna Roll",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 43
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 12:08:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 44
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 12:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 45
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 12:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 46
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 12:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 47
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 12:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 48
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 13:08:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 49
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 13:08:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 50
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 13:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 51
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 13:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 52
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 13:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 53
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 13:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 54
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 14:08:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 55
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 14:08:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 56
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 14:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 57
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 14:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 58
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 14:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 59
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 14:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 60
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 14:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 61
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 14:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 62
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 15:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 63
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 15:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 64
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 16:08:32.260943+00",
    name: "Avocado Veggie Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Avocado, Cucumber, Carrot, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 65
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 16:08:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 66
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 16:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 67
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 16:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 68
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 16:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 69
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 16:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 70
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 16:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 71
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 17:08:32.260943+00",
    name: "Avocado Veggie Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Avocado, Cucumber, Carrot, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 72
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 17:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 73
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 17:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 74
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 17:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 75
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 17:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 76
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 18:18:32.260943+00",
    name: "Avocado Veggie Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Avocado, Cucumber, Carrot, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 77
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 18:18:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 78
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 18:18:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 79
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 18:18:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 80
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 18:18:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 81
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 18:18:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 82
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 18:18:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 83
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 18:18:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 84
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 18:18:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 85
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 18:18:32.260943+00",
    name: "Spicy Tuna Roll",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 86
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 19:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 87
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 19:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 88
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 19:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 89
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 20:58:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 90
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 20:58:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 91
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 20:58:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 92
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 21:08:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 93
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 21:08:32.260943+00",
    name: "Tuna Salmon Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Atlantic Salmon, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 94
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 21:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 95
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 21:08:32.260943+00",
    name: "Spicy Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Salmon, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 96
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 21:08:32.260943+00",
    name: "Spicy Tuna Roll",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 97
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 22:08:32.260943+00",
    name: "Avocado Veggie Combo",
    menu_name: "Sushi Day",
    ingredients_array: "[Avocado, Cucumber, Carrot, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 98
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 22:08:32.260943+00",
    name: "Spicy Tuna Roll",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Sesame Oil, Rice Vinegar, Spicy Mayo, Soy Sauce, Fresh Ginger, Seaweed, Sushi Rice, Nori, Yellowtail, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 99
  },
  {
    service_date: "2023-03-24",
    meal_opt_in_created_date: "2023-03-21 23:08:32.260943+00",
    name: "Sashimi Naruto Maki [10 pc]",
    menu_name: "Sushi Day",
    ingredients_array: "[Tuna, Avocado, Cucumber, Sesame Oil, Rice Vinegar, Soy Sauce, Fresh Ginger, Seaweed, Atlantic Salmon, Seaweed Salad, Agar Agar, Wasabi]",
    service_id: 101,
    meal_opt_in_id: 100
  }
];