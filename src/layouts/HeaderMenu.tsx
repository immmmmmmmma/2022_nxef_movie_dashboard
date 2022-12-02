import MovieIcon from "@mui/icons-material/Movie";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { menuItems } from "../public/data";

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100px;
  top: 0;
  background-color: #373b69;
  z-index: 999;
`;

const Col = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 45px;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
`;

const Items = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Item = styled(NavLink)`
  margin: 20px;
  width: 110px;
  padding: 10px;
  border: 0;
  outline: 0;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  transition: color 0.3s;
  color: #fff;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    color: #333;
    background-color: #fff;
  }

  &.active {
    background-color: #fff;
    color: #333;
  }
`;

const Menu = () => {
  return (
    <Nav>
      <Col>
        <IconBox>
          <Avatar sx={{ m: 1 }}>
            <MovieIcon />
          </Avatar>
          {"O O O 님"}
        </IconBox>
        <Items>
          {menuItems.map(item => (
            <Item
              key={item.key}
              to={item.path}
            >
              {item.name}
            </Item>
          ))}
        </Items>
      </Col>
    </Nav>
  );
};

export default Menu;
