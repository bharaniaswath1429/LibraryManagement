import React from "react";
import { useBooksContext } from "../context/books_context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";

const FeaturedBooks = () => {
  const { books_loading: loading,
    books_error: error,
    featured_books: featured, } = useBooksContext()
  if (loading) {
    return <Loading/>
  }
  if (error) {
    return <Error/>
  }
  return <Wrapper className="section">
    <div className="title">
      <h2>Featured Books</h2>
    </div>
    <div className="section-center featured">
      {featured.slice(0,3).map((book) => {
        return <Product key={book.id} {...book} />
      })}
    </div>
  </Wrapper>
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedBooks;
