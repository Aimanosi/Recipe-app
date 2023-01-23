import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import React from "react";

const Recipe = () => {
  let params = useParams();

  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);
  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>

      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredient" ? "active" : ""}
          onClick={() => setActiveTab("ingredient")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
            <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
          </div>
        )}

        {activeTab === "ingredient" && (
          <ul>
            {details.extendedIngredients.map((ingredients) => (
              <li>{ingredients.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin-top: 6rem;
  margin-bottom: 5rem;
  display: flex;

  @media (max-width: 768px) {
    display: block;
  }
  @media (max-width: 1200px) {
    display: block;
  }

  img {
    border-radius: 2rem;
    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
    margin-bottom: 1rem;
  }

  li {
    font-size: 1rem;
    line-height: 2.5rem;
    margin-left: 1rem;
  }

  ul {
    margin-top: 2rem;
  }

  p {
    font-size: 1rem;
    text-decoration: none;
    margin-top: 2rem;
    text-align: justify;
  }

  a {
    text-decoration: none;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const Info = styled.div`
  margin-left: 5rem;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;
export default Recipe;
