import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBooksContext } from "../context/books_context";
import { singleapi as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { single_book_loading: loading,
    single_book_error: error,
    single_book: book,
    fetchSingleBook} = useBooksContext()
  useEffect(() => {
    fetchSingleBook(`${url}${id}`)
  }, [id])
  
  useEffect(() => {
    if (error) {
      setTimeout(() => {
      navigate("/")
    },3000)
  }
},[error])

  if (loading) {
    return <Loading/>
  }
  if (error) {
    return <Error/>
  }
  const {name,price,description,stocks,stars,reviews,company,images,publishdate} = book
  return <Wrapper>
    <PageHero title={name} book />
    <div className="section section-center page">
      <Link to='/books' className='btn'>
        back to books
      </Link>
      <div className="product-center">
        <ProductImages images={ images} />
        <section className="content">
          <h2>{name}</h2>
          <Stars stars={stars} reviews={reviews}/>
          <h5 className="price">{formatPrice(price)}</h5>
          <p className="desc">{description}</p>
          <p className="info">
            <span>Available :</span>
            {stocks > 0 ? 'In stock':'out of stock'}
          </p>
          <p className="info">
            <span>Published on :</span>
            {publishdate}
          </p>
          <p className="info">
            <span>Author :</span>
            {company}
          </p>
          <hr />
          {stocks > 0 && <AddToCart book={ book} />}
        </section>
      </div>
    </div>
  </Wrapper>
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
