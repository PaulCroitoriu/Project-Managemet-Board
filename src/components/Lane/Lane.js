import React from "react";
import styled from "styled-components";

import Ticket from "../Ticket/Ticket";

const LaneWrapper = styled.div`
  list-style: none;
  text-align: left;
  padding: 0;
  background: #839b97;
  border-radius: 20px;
  min-height: 50vh;
  width: 20vw;

  @media (max-width: 768px) {
    margin-bottom: 5%;
  }
`;

const Title = styled.h2`
  width: 100%;
  padding-bottom: 10px;
  text-align: center;
  border-bottom: 1px solid darkGray;
`;

const TicketsWrapper = styled.div`
  padding: 5%;
`;

const Alert = styled.div`
  text-align: center;
`;

const Lane = ({
  laneId,
  title,
  loading,
  tickets,
  error,
  onDragStart,
  onDragOver,
  onDrop,
}) => (
  <LaneWrapper onDragOver={e => onDragOver(e)} onDrop={e => onDrop(e, laneId)}>
    <Title>{title}</Title>

    {(loading || error) && <Alert>{loading ? "Loading..." : error}</Alert>}
    <TicketsWrapper>
      {tickets.map(ticket => (
        <Ticket onDragStart={onDragStart} key={ticket.id} ticket={ticket} />
      ))}
    </TicketsWrapper>
  </LaneWrapper>
);

export default Lane;
