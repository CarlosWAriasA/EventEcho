import {
  CalendarCheck,
  ChevronsRight,
  CircleUserRound,
  PersonStanding,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { forwardRef, useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import RequestHelper from "../../utils/requestHelper";
import ToastHelper from "../../utils/toastHelper";
import useKeypress from "react-use-keypress";
import { KEY_ENTER } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContext";

function EventAdmin() {
  const { setIsLoading } = useContext(LoadingContext);
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    totalPeople: 0,
    totalEvents: 0,
    upcomingEvents: 0,
  });

  useEffect(() => {
    if (user.tipo_usuario !== "organizador") {
      navigate("/");
    }
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const result = await RequestHelper.get("/user/events-info");
      setInfo({
        totalPeople: result.totalAttendees,
        totalEvents: result.totalEvents,
        upcomingEvents: result.upcomingEvents.length,
      });
      const events = result?.allEvents.map((e) => ({
        id: e.id,
        name: e.title,
        location: e.location,
        amount: `${e.UserEvents.length}/${e.attendees}`,
        people: e.attendees,
        date: new Date(e.date).toLocaleDateString(),
        subscribed: e.UserEvents.length,
      }));
      setEvents(events);
    } catch (error) {
      ToastHelper.error("Ha ocurrido un error");
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      width: 200,
      label: "Nombre del Evento",
      dataKey: "name",
    },
    {
      width: 150,
      label: "Localidad",
      dataKey: "location",
    },
    {
      width: 150,
      label: "Cantidad/Limite",
      dataKey: "amount",
    },
    {
      width: 100,
      label: "Fecha",
      dataKey: "date",
    },
  ];

  const VirtuosoTableComponents = {
    Scroller: forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? "right" : "left"}
            style={{ width: column.width, fontWeight: "bold" }}
            sx={{
              backgroundColor: "background.paper",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  const handleClick = (eventId) => {
    navigate(`/event-edit/${eventId}`);
  };

  function rowContent(_index, row) {
    return (
      <>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? "right" : "left"}
            onClick={() => handleClick(row.id)}
            className="hover:cursor-pointer overflow-hidden whitespace-nowrap text-overflow-ellipsis"
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </>
    );
  }

  useKeypress(KEY_ENTER, () => {
    navigate("/event-edit");
  });
  return (
    <main className="bg-white h-full text-black pl-36 pt-8 overflow-y-auto flex">
      <div className="h-full w-10/12">
        <div className="flex gap-6">
          <div className="bg-blue-950 rounded-3xl p-5 flex justify-between flex-col items-center w-56 h-40">
            <span className="text-white flex flex-col justify-center">
              <p>Crea un nuevo </p>
              <p className="flex justify-center">evento</p>
            </span>
            <NavLink to={"/event-edit"}>
              <button
                type="button"
                className="bg-yellow-400 p-1 w-32 pl-10 pr-10 rounded-lg "
              >
                Crear
              </button>
            </NavLink>
          </div>
          <div className="border-4 border-gray-600 rounded-3xl p-5 flex w-3/5 text-black justify-center gap-16">
            <div className=" flex flex-col justify-center items-center">
              <CalendarCheck
                color="yellow"
                size={50}
                style={{
                  borderRadius: "50%",
                  padding: "8px",
                  backgroundColor: "gray",
                }}
              />
              <p className="flex justify-center">Total de Eventos</p>
              <p>{info.totalEvents}</p>
            </div>
            <div className=" flex flex-col justify-center items-center">
              <PersonStanding
                color="yellow"
                size={50}
                style={{
                  borderRadius: "50%",
                  padding: "8px",
                  backgroundColor: "gray",
                }}
              />
              <p className="flex justify-center">Total de Personas</p>
              <p>{info.totalPeople}</p>
            </div>
            <div className=" flex flex-col justify-center items-center">
              <ChevronsRight
                color="yellow"
                size={50}
                style={{
                  borderRadius: "50%",
                  padding: "8px",
                  backgroundColor: "gray",
                }}
              />
              <p className="flex justify-center">Eventos Proximos</p>
              <p>{info.upcomingEvents}</p>
            </div>
          </div>
        </div>
        <Paper className="w-10/12 h-3/5 mt-10">
          <TableVirtuoso
            data={events}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </div>
      <div className="border-t-4 border-l-4 pt-2 pl-3 w-1/4 pr-2">
        <h2 className="text-xl font-bold">Notificaciones</h2>
        <div className="bg-blue-500 rounded-xl p-5 flex flex-col mt-5">
          <div className="flex items-center gap-1">
            <CircleUserRound size={20} />
            <p>Carlos Arias</p>
          </div>
          <p className="mt-2">
            Me ha encatando el evento espero con ansias el proximo
          </p>
        </div>
      </div>
    </main>
  );
}

export default EventAdmin;
