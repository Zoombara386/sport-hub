import { useState } from "react";


export default function News() {


  const [category, setCategory] = useState("All");



  const news = [


    {
      id: 1,
      title: "Premier League Transfer Updates",
      category: "Transfers",
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
      text:
        "Latest football transfers, rumours and club announcements."
    },


    {
      id: 2,
      title: "Champions League Match Reports",
      category: "Matches",
      image:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20",
      text:
        "Results, highlights and important moments from games."
    },


    {
      id: 3,
      title: "Football Stars Performance",
      category: "Players",
      image:
        "https://images.unsplash.com/photo-1553778263-73a83bab9b0c",
      text:
        "Player statistics, goals and latest performances."
    },


    {
      id: 4,
      title: "Premier League Table Updates",
      category: "League",
      image:
        "https://images.unsplash.com/photo-1518600506278-4e8ef466b810",
      text:
        "League standings and club updates."
    }


  ];





  const filteredNews =

    category === "All"

    ?

    news

    :

    news.filter(
      item =>
      item.category === category
    );





  return (

    <div className="container">


      <h1>
        📰 Football News
      </h1>



      <div className="nav-buttons">


        {
          [
            "All",
            "Transfers",
            "Matches",
            "Players",
            "League"

          ].map((item)=>(


            <button

              key={item}

              onClick={() =>
                setCategory(item)
              }

            >

              {item}

            </button>


          ))
        }


      </div>






      <div className="cards">


      {

      filteredNews.map((item)=>(


        <div

          className="card"

          key={item.id}

        >



          <img

            src={item.image}

            alt={item.title}

            width="250"

          />



          <h2>
            {item.title}
          </h2>



          <p>
            🏷️ {item.category}
          </p>



          <p>
            {item.text}
          </p>



          <button>

            Read More

          </button>



        </div>


      ))

      }



      </div>



    </div>

  );

}