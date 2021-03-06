import styled from 'styled-components';
import { shade, lighten } from 'polished';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #48FF02;
    display: flex;
    align-items: center;
    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      svg {
        color: #312e38;
        transition: color 0.3s;
      }
      a:hover {
        svg {
          color: ${lighten(0.2, '#312e38')};
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -176px auto 0;
  width: 100%;
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;
    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }
    button {
    background: #48FF02;
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    color: #312e38;
    width: 100%;
    font-weight: 500;
    margin-top: 16px;
    transition: background-color 0.2s;
    &:hover {
      background: ${shade(0.2, '#48FF02')};
    }
  }
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  margin-bottom: 32px;
  align-self: center;
  margin-bottom: 120px;
  >img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }
  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #48FF02;
    border: none;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
    cursor: pointer;
    input {
      display: none;
    }
    &:hover {
      background: ${shade(0.2, '#48FF02')};
    }
    svg {
      color: #312e38;
    };
  }
`;
