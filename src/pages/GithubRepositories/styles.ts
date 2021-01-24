import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.div`
  padding: 22px 0;
  background: #48FF02;
`;

export const HeaderContent = styled.header`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  > img {
    height: 80px;
  }
  button {
    margin-left: auto;
    background: transparent;
    border: 0;
    svg {
      color: #E53E3E;
      width: 100px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    span {
      color: #4A5568;
    }
    a {
      text-decoration: none;
      color: #4A5568;
      &:hover {
        color:#fff;
        opacity: 0.9;
      }
    }

  }
`;



