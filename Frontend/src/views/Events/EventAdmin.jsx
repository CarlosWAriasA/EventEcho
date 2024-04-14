import { CircleUserRound } from "lucide-react";
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
import RequestHelper from "../../utils/requestHelper";
import ToastHelper from "../../utils/toastHelper";
import useKeypress from "react-use-keypress";
import { KEY_ENTER } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContext";
import Skeleton from "react-loading-skeleton";
import "./Event.css";
import ButtonForm from "../../components/Button/ButtonForm";
import { PieChart } from "@mui/x-charts";
import { Typography } from "@mui/material";

function EventAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    totalPeople: 0,
    totalEvents: 0,
    upcomingEvents: 0,
    totalPeopleSubscribe: 0,
    totalEventsOpen: 0,
    totalEventsClose: 0,
  });
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    if (user.tipo_usuario !== "organizador") {
      navigate("/");
    }
    loadEvents();
    getNotificaciones();
  }, []);

  const getNotificaciones = async () => {
    try {
      const result = await RequestHelper.get("notificaciones", {
        source: "C",
        userRecieverId: user.id,
      });
      setNotificaciones(result);
    } catch (error) {
      ToastHelper.error(error.message ?? "Ha ocurrido un error");
    }
  };

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const result = await RequestHelper.get("/user/events-info");
      setInfo({
        totalPeople: result.totalAttendees,
        totalPeopleSubscribe: result.allEvents?.reduce(
          (acc, v) => acc + (v.UserEvents?.length ?? 0),
          0
        ),
        totalEvents: result.totalEvents,
        upcomingEvents: result.upcomingEvents.length,
        totalEventsClose: result.allEvents?.filter(
          (e) => new Date(e.date) <= Date.now()
        ).length,
        totalEventsOpen: result.allEvents?.filter(
          (e) => new Date(e.date) > Date.now()
        ).length,
      });
      const events = result?.allEvents
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((e) => ({
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
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
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
            style={{
              width: column.width,
              fontWeight: "700",
              fontFamily: "quicksand",
              fontSize: 15,
            }}
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
            {isLoading ? <Skeleton /> : row[column.dataKey]}
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
          <div
            className="rounded-3xl p-5 flex justify-around flex-col items-center w-56 h-40"
            style={{
              backgroundColor: "rgba(33, 42, 62, 1)",
            }}
          >
            <span className="font-quicksand font-semibold text-lg flex justify-center">
              <p
                style={{ width: "90%", textAlign: "center", color: "#FCFCFC" }}
              >
                Crea un nuevo evento
              </p>
            </span>
            <NavLink to={"/event-edit"}>
              <ButtonForm
                variant={"filled"}
                label={"Crear"}
                style={{
                  color: "#212A3E",
                  width: "5rem",
                  height: "2em",
                  backgroundColor: "rgba(254, 219, 57, 1)",
                  fontSize: "1em",
                  letterSpacing: "1px",
                  textTransform: "none",
                }}
              />
            </NavLink>
          </div>
          <div
            className="  rounded-3xl p-5 flex w-4/6 text-black justify-center gap-16"
            style={{
              boxShadow: "2px 2px 7px rgba(33, 42, 62, .3)",
            }}
          >
            <div className=" flex flex-col justify-center items-center">
              <PieChart
                sx={{ marginLeft: "5vw" }}
                series={[
                  {
                    data: [
                      {
                        label: "Total De Eventos",
                        value: info.totalEvents,
                        color: "#FEDB39",
                      },
                    ],
                  },
                ]}
                slotProps={{
                  legend: { hidden: true },
                }}
                width={170}
              />
              <Typography style={{ fontFamily: "quicksand", fontWeight: 600 }}>
                Total de Eventos
              </Typography>
            </div>
            <div className=" flex flex-col justify-center items-center">
              <PieChart
                sx={{ marginLeft: "5vw" }}
                series={[
                  {
                    data: [
                      {
                        label: "Total De Personas",
                        value: info.totalPeople,
                        color: "#FEDB39",
                      },
                      {
                        label: "Total de Inscritos",
                        value: info.totalPeopleSubscribe,
                        color: "#394867",
                      },
                    ],
                  },
                ]}
                slotProps={{
                  legend: { hidden: true },
                }}
                width={170}
              />
              <Typography style={{ fontFamily: "quicksand", fontWeight: 600 }}>
                Total de Personas
              </Typography>
            </div>
            <div className="flex flex-col justify-center items-center">
              <PieChart
                sx={{ marginLeft: "5vw" }}
                series={[
                  {
                    data: [
                      {
                        label: "Eventos Abiertos",
                        value: info.totalEventsOpen,
                        color: "#FEDB39",
                      },
                      {
                        label: "Eventos Cerrados",
                        value: info.totalEventsClose,
                        color: "#394867",
                      },
                    ],
                  },
                ]}
                slotProps={{
                  legend: { hidden: true },
                }}
                width={170}
              />
              <Typography style={{ fontFamily: "quicksand", fontWeight: 600 }}>
                Eventos Abiertos
              </Typography>
            </div>
          </div>
        </div>
        <Paper className="w-10/12 h-3/5 mt-10">
          <TableVirtuoso
            data={isLoading ? Array.from({ length: 8 }) : events}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </div>
      <div
        className=" pt-2 pl-3 w-1/4 pr-2 overflow-auto"
        style={{
          borderRadius: "1.2rem 0 0 0",
          border: "2px soolid",
          boxShadow: "2px 2px 8px rgba(33, 42, 62, .8) ",
        }}
      >
        <h2 className="font-quicksand text-xl font-semibold p-3">
          Notificaciones
        </h2>
        {notificaciones.map((n) => {
          const comentario = n.Comentario;
          return (
            <NavLink
              to={`/event-detail/${comentario?.eventId}`}
              key={comentario?.id}
            >
              <div className="bg-blue-500 rounded-xl p-5 flex flex-col mt-5 text-white">
                <div className="flex items-center gap-1">
                  {comentario?.Usuario.image64 ? (
                    <img
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        boxShadow: "0 0px 5px rgba(0, 0, 0, 0.4)",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      src={`data:image/png;base64, ${comentario?.Usuario.image64}`}
                    />
                  ) : (
                    <CircleUserRound size={20} />
                  )}
                  <p>{comentario?.Usuario.name}</p>
                </div>
                <p className="mt-2">
                  {comentario?.description.length > 200
                    ? `${comentario?.description.substring(0, 200)}...`
                    : comentario?.description}
                </p>
              </div>
            </NavLink>
          );
        })}
      </div>
    </main>
  );
}

export default EventAdmin;
