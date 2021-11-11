import styled from "styled-components";

import { EmailForm } from "./EmailForm";

const ViewContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const MagicLink = () => {
  return (
    <ViewContainer>
      <EmailForm />
    </ViewContainer>
  );
};
