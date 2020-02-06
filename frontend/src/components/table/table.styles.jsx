import styled from 'styled-components';

/*
$bg: #eeeeee;
$blue: #164193;
$blue-light: #3688e9;
$bg-white-active: #ebf2ff;
$yellow: #ffa901;
$green: #20c466;
$orange: #f8692b;
*/

const Style = styled.div`
  

  table {
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
    font-family: "Roboto Condensed", Arial, Helvetica, sans-serif;
    font-size: 14px;
    text-align: center;
    thead {
      tr {
        th {
          padding: 0.5rem;
          &.select-all {
            width: 36px;
          }
          &.logo-ico {
            width: 72px;
          }
          &.th-delete {
            width: 42px;
          }
          &.th-approve {
            width: 100px;
          }
          &.th-status {
            width: 110px;
          }
        }
      }
    }
    tbody {
      tr {
        background: white;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.09);
        transition: all 0.5s ease;
        
        td {
          padding: 0.5rem;
          height: 70px;
          border-bottom: 1px solid #ddd;
          position: relative;
          &.td-select-all {
            text-align: center;
          }
          &.td-subscriber {
            font-weight: bold;
          }
          &.td-approval-status,
          &.td-status {
            .span-status {
              padding: 0.2rem 1rem;
              font-weight: bold;
              color: white;
              background: #aaa;
              border-radius: 3px;
            }
            .status-green {
              color: #20c466;
              background: none;
              margin-top: 13px;
            }

           .status-orange {
              background: #f8692b;
              margin-top: 13px;
            }
            
            
          }
          &.td-url {
            text-align: center;
          }
          &.td-date {
            text-align: center;
          }
          &.td-delete {
            color: $orange;
          }
          &.td-approve {
            button {
              height: 36px;
              width: 45%;
              font-family: "Roboto Condensed", Arial, Helvetica,
                sans-serif;
              cursor: pointer;
              text-align: center
            }
          }
          &.td-approved-by {
            
          }
        }
      }
      tr:nth-child(even) {
        background-color: #f4f4f4;
        &:hover {
          background: #ebf2ff;
        }
      }
      tr {
        &:hover {
          background: #ebf2ff;
        }
      }
    }
  }
`;

export default Style;