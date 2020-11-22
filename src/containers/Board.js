import React from "react";
import styled from "styled-components";

import withDataFetching from "../withDataFetching";
import Lane from "../components/Lane/Lane";

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

class Board extends React.Component {
  constructor() {
    super();

    this.state = {
      tickets: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ tickets: this.props.data });
    }
  }

  // onDragEvent handler - fires when the dragging operation is started
  onDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDrop = (e, laneId) => {
    const id = e.dataTransfer.getData("id");

    const tickets = this.state.tickets.filter(ticket => {
      if (ticket.id === parseInt(id)) {
        ticket.lane = laneId;
      }
      return ticket;
    });

    this.setState({
      ...this.state,
      tickets,
    });
  };

  render() {
    const { lanes, loading, error } = this.props;
    const { tickets } = this.state;

    return (
      <BoardWrapper>
        {lanes.map(lane => (
          <Lane
            key={lane.id}
            laneId={lane.id}
            loading={loading}
            error={error}
            onDragStart={this.onDragStart}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
            title={lane.title}
            tickets={tickets.filter(ticket => ticket.lane === lane.id)}
          />
        ))}
      </BoardWrapper>
    );
  }
}

export default withDataFetching(Board);
