import styled from 'styled-components';


export const LoginStyleWrapper = styled.div`
.login {
    background-color: #043b82;
    margin: 0;
    font-family: "Open Sans", Helvetica, arial, sans-serif;
    color: #3c4044;
    &#login {
      background-color: #043b82;
      .bg {
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("../../../assets/images/bgLogin.jpg") no-repeat;
        background-position: bottom left;
        background-size: 50vw auto;
        background-color: #043b82;
      }
      .login-containter {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 2rem;
        width: 450px;
        background: white;
        .logo {
          margin-top: 1rem;
          margin-bottom: 2rem;
          text-align: center;
          img {
            width: 112px;
            height: auto;
          }
        }
        form {
          input {
            margin-bottom: 0.5rem;
            padding: 0.5rem;
            width: 100%;
            height: 45px;
            background: #f4f4f4;
            border: 1px solid #dddddd;
            border-radius: 6px;
            &:hover,
            &:active,
            &:focus {
              border: 1px solid #aaaaaa;
            }
          }
          .btn-login {
            display: inline-block;
            margin-top: 0.5rem;
            padding: 1rem 1rem;
            width: 100%;
            // height: 45px;
            color: white;
            text-align: center;
          }
  
          p {
            text-align: center;
          }
        }
      }
    }
  }
`;