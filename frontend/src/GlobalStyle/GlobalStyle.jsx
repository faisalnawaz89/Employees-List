import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
    }
        
    body{
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-style: normal;
        background: #F6F1E9;
        h1{
            font-size: 2rem;
        }
        h3{
            font-size: 1.1rem;
        }
        p{
            font-size: 1rem;
        }
    }
    .form-group, .g--cell{
        display: grid;
        grid-template-columns: 120px auto;
        align-items: baseline;
    }
    .form-group input{
        width: 100%;
        height: 45px;
        border: 2px solid #c7c7c7;
        margin-bottom: 30px;
        border-radius: 4px;
        padding: 0px 15px;
    }
    .form-group label {
        min-width: 120px;
    }
    .form-group.d-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 70px;
    }
    .submitBtn{
        background: #000;
        border: 2px solid #313131;
        border-radius: 4px;
        padding: 15px 60px;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
    }
    .img--wrapper{
        position:relative
    }
    .forminput svg{
        position:relative;
        left: -15px;
        cursor:pointer;
    }   

    .forminput img {
        width: 225px;
        height: 270px;
        position: relative;
        object-fit: cover;
        cursor: pointer;
        z-index: 100;
        border-radius: 4px;
    }

    .empImg--overlay{
        position: absolute;
        width: 95%;
        height: 91%;
        margin: 10px;
        top: 0;
        background: #000;
        opacity: 0.4;
        z-index: 999;
        cursor: pointer;
        transition:all .2s ease-in
    }
    .empImg--overlay svg{
        position: absolute!important;
        left: auto!important;
        bottom: 10px!important;
        right: 10px;
    }
    .empImg{
        width: 40px;
        height: 40px;
        position: relative;
        object-fit: cover;
        border-radius: 4px;
        box-shadow: 2px 1px 4px 0px #00000036;
    }  
    .emp--id{
        font-style: italic;
        font-size: 14px;
        color: #5c5c5c;
        padding-top: 4px;
    }
    .addbtn {
        display: flex;
        align-items: end;
        gap: 7px;
    }
    .successMsg{
        color:green;
        font-size:14px;
        margin-top:15px
    }
    .inputCell{
        position:relative
    }
    .inputCell .error{
        position: absolute;
        bottom: 12px;
        left: 0;
        font-size: 12px;
        color: #d50101;
    }
        .loginSignup-fields input{
            width: 100%;
            height: 50px;
            margin-bottom: 13px;
            border: 2px solid #00000029;
            border-radius: 4px;
            padding: 0 15px;
        }
        .loginSignup-fields button{
            background: #363333;
            color: #fff;
            width: 100%;
            border: 2px solid #545454;
            border-radius: 4px;
            padding: 13px 0;
            margin-bottom: 10px;
            font-size: 17px;
            font-weight: 600;
            cursor:pointer
        }
        .loginSignup-fields p{
            font-size:14px
        }
        .login--link{
            color: #837f7f;
            text-decoration: underline;
            cursor:pointer
        }
`;
