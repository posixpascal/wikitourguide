import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Container from './container';

const Navigation = styled.nav`
  font-family: 'Open Sans', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 15px 20px;
  border-bottom: 1px solid #dedede;
  font-size: 24px;

  .logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 20px;
  }

  .logo-image {
    margin-right: 20px;
  }

  ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const NavItems = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  width: 33%;
  justify-content: space-between;

  li {
    list-style: none;
  }

  a {
    display: none;
  }

  a[href] {
    display: block;
    color: #1f4ea1;
    text-decoration: none;

    &:hover {
      color: #3377f3;
    }
  }

  @media (max-width: 991px) {
    .hidden-xs {
      display: none;
    }
  }

  @media (max-width: 750px) {
    .hidden-xxs {
      display: none;
    }
  }
`;

const Navbar = () => {
  return (
    <Navigation>
      <Container>
        <NavItems>
          <li className={'hidden-xxs'}>
            <a href={'/#sogehts'}>So funktioniert's</a>
          </li>
          <li className={'hidden-xs'}>
            <a href={'/#nearby'}>In meiner Nähe</a>
          </li>
        </NavItems>
        <Link className={'logo'} to={'/'}>
          <StaticImage
            className={'logo-image'}
            src="../images/icon.png"
            alt="App Logo"
            placeholder="blurred"
            quality={100}
            width={72}
            height={72}
          />
        </Link>
        <NavItems>
          <li className={'hidden-xs'}>
            <a href={'/#tellme'}>Stimme</a>
          </li>
          <li>
            <a href={'/app/player'}>Web Version</a>
          </li>
        </NavItems>
      </Container>
    </Navigation>
  );
};

export default Navbar;
