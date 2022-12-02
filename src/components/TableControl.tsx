import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { SMovie, STVShow } from "../api/api";
import { selectedMediaState } from "../atoms/atom";

export interface Board {
  id:
    | "title"
    | "name"
    | "backdrop_path"
    | "vote_average"
    | "vote_count"
    | "release_date"
    | "first_air_date"
    | "overview";
  label: string;
  display: "table-cell" | "none";
  minWidth?: number;
  maxWidth?: number;
  align?: "center";
}
const CellView = styled(TableCell)`
  width: 400px;
  white-space: inherit;
  overflow: hidden;
`


const BodyRow = styled(TableRow)`
  cursor: pointer;
  overflow: hidden;
`;


const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const TableContainerWrapper = styled(TableContainer)`
  width: 100%;
  height: 100%;
`;

interface ITableControlProps {
  Board: Board[];
  datas: SMovie[] | STVShow[];
}

const TableControl = ({ Board, datas }: ITableControlProps) => {
  const setMedia = useSetRecoilState(selectedMediaState);

  const handleTableRowClick = (
    e: React.MouseEvent<HTMLElement>,
    id: number,
  ) => {
    const children = [].slice.call(e.currentTarget.children);
    const copyMedia: SMovie | STVShow = {} as SMovie | STVShow;

    children.forEach((child: HTMLElement) => {
      const [key, value] = [child.id, child.innerText];
      copyMedia[key] = value;
    });

    copyMedia["id"] = id;

    setMedia(copyMedia);
  };

  return (
    <Container>
      <TableContainerWrapper>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {Board.map(Board => (
                <CellView
                  key={Board.id}
                  align={Board.align}
                  style={{
                    minWidth: Board.minWidth,
                    maxWidth: Board.maxWidth,
                    display: Board.display,
                  }}
                >
                  {Board.label}
                </CellView>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map(data => {
              return (
                <BodyRow
                  hover
                  tabIndex={-1}
                  key={data.id}
                  id={data.id.toString()}
                  onClick={e => handleTableRowClick(e, data.id)}
                >
                  {Board.map(Board => {
                    return (
                      <CellView
                        key={Board.id}
                        id={Board.id}
                        align={Board.align}
                        style={{
                          display: Board.display,
                        }}
                      >
                        {Board.id === "backdrop_path" ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w342${
                              data[Board.id]
                            }`}
                            alt="poster"
                          />
                        ) : (
                          data[Board.id]
                        )}
                      </CellView>
                    );
                  })}
                </BodyRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainerWrapper>
    </Container>
  );
};

export default TableControl;
