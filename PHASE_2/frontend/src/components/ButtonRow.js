import React from "react";
import { StoreContext } from '../Store';
import { ButtonRow } from "./StyledComponents";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const graphs = ["Disease", "Jobs Market", "Financial"]

function GraphSwap() {
    const { graph } = React.useContext(StoreContext);
    const [alignment, setAlignment] = React.useState(graph.graph);

    const handleChange = (event, newAlignment) => {
        graph.setGraph(newAlignment);
        setAlignment(newAlignment);
    }

    return (
        <ButtonRow>
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleChange}
                color="error"
            >
                {graphs.map((type, i) => (
                    <ToggleButton key={i} value={type}>{type}</ToggleButton>
                ))}
            </ToggleButtonGroup>
        </ButtonRow>
    );
}

export { GraphSwap }
