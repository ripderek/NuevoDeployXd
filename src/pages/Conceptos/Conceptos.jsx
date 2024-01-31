import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  PencilIcon,
  UserPlusIcon,
  PlusIcon,
  ArrowRightCircleIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Collapse,
  Checkbox,
} from "@material-tailwind/react";
import { tasks } from "../../Data/Conceptos";

import { Calc_tendria_central } from "@/pages/Calc/Calc_tendria_central";
import { Calc_Bernoulli } from "@/pages/Calc/Calc_Bernoulli";
import { Calc_Poisson } from "@/pages/Calc/Calc_Poisson";
import { Calc_Binomial } from "@/pages/Calc/Calc_Binomial";
import { Calc_Normal } from "@/pages/Calc/Calc_Normal";
import { Calc_Bayes } from "@/pages/Calc/Calc_Bayes";
import { Frecuencia } from "@/pages/Calc/Frecuencia";
import { Asistente } from "@/pages/Calc/Asistente/Asistente";

//const TABLE_HEAD = ["Member", "Function", "Status", "Employed", ""];
import { useEffect, useState } from "react";
export default function Conceptos({ id_seccion }) {
  const [concepto, setConcepto] = useState({
    definiciones: [],
    links_youtube: [],
    links_pdf: [],
  });
  const [load, setLoader] = useState(false);
  //Conceptos
  useEffect(() => {
    ObtenerPreguntas();
  }, []);

  // Función para obtener los datos de manera asíncrona
  const ObtenerPreguntas = async () => {
    setLoader(true);
    try {
      // Filtrar los datos con id === 0 y extraer título y concepto
      const conceptoConIdCero = await tasks.find(
        (task) => task.id === id_seccion
      );
      // Establecer el estado con el concepto encontrado
      setConcepto(conceptoConIdCero || {});
      setLoader(false);
    } catch (error) {
      console.error("Error al obtener las preguntas:", error);
      setLoader(false);
    }
  };

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((cur) => !cur);

  const [openRecursos, setOpenRecursos] = useState(false);
  const toggleOpenRecursos = () => setOpenRecursos((cur) => !cur);
  //collapse para abrir la calculadora xdxdxd skere modo diablo
  const [openCalculadora, setOpenCalculadora] = useState(false);
  const toggleOpenCalculadora = () => setOpenCalculadora((cur) => !cur);

  //HACER UN SWITCH PARA RENDERIZAR UN COMPONENTE DE CALCULADORA DEPENDIENDO DEL ID QUE RECIBE ESTE COMPONENTE
  //calc_tendria_central

  const renderComponent = () => {
    switch (id_seccion) {
      case 0:
        return (
          <Calc_tendria_central
            idseccion={id_seccion}
            tituloCal={concepto.title}
          />
        );
      //Calc_Bernoulli
      case 1:
        return (
          <Calc_Bernoulli idseccion={id_seccion} tituloCal={concepto.title} />
        );
      //Calc_Poisson
      case 2:
        return (
          <Calc_Poisson idseccion={id_seccion} tituloCal={concepto.title} />
        );
      case 3:
        return (
          <Calc_Binomial idseccion={id_seccion} tituloCal={concepto.title} />
        );
      case 4:
        return (
          <Calc_Normal idseccion={id_seccion} tituloCal={concepto.title} />
        );
      case 5:
        return <Calc_Bayes idseccion={id_seccion} tituloCal={concepto.title} />;

      case 6:
        return <Frecuencia idseccion={id_seccion} tituloCal={concepto.title} />;

      default:
        return null; // Otra opción por defecto si ninguna condición es verdadera
    }
  };
  //PARA EL ASISTENTE
  const [openAsistente, setOpenAsistente] = useState(true);
  const cerrarAsistente = () => setOpenAsistente(false);
  return (
    <Card className="h-full w-full mt-7">
      {openAsistente && (
        <Asistente cerrar={cerrarAsistente} id_seccion1={id_seccion} />
      )}

      <>
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none mb-0"
        >
          <div className=" flex items-center justify-between gap-8">
            <div className="text-center mx-auto">
              <Typography
                variant="h3"
                color="deep-purple"
                className="font-bold"
              >
                {concepto.title}
                <Button
                  onClick={() => setOpenAsistente(true)}
                  variant="gradient"
                  color="pink"
                  className="w-auto rounded-xl p-2 ml-3"
                >
                  <FaceSmileIcon className="h-8 mx-auto" />
                  Ayuda
                </Button>
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className=" mt-0">
          {/* TEORIA */}
          <Button
            onClick={toggleOpen}
            variant="outlined"
            color="deep-purple"
            className="w-full"
          >
            Teoria
          </Button>
          <Collapse open={open}>
            <Card className="my-4 mx-auto w-full">
              <CardBody>
                {concepto.description}
                {/*      {concepto.definiciones && ( */}
                <div className="p-6">
                  {concepto.definiciones &&
                    concepto.definiciones.length !== 0 &&
                    concepto.definiciones.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <Typography variant="lead" color="deep-purple">
                          {item.tipo}
                        </Typography>
                        <li>{item.definition}</li>
                      </div>
                    ))}
                </div>

                {concepto.description2}
              </CardBody>
            </Card>
          </Collapse>
          {/*ENLACES EXTERNOS DE RECURSOS*/}
          <Button
            onClick={toggleOpenRecursos}
            variant="outlined"
            color="deep-purple"
            className="w-full mt-3"
          >
            Recursos
          </Button>
          <Collapse open={openRecursos}>
            <Card className="my-4 mx-auto w-full">
              <CardBody>
                {/* PARA LOS VIDEOS*/}
                <Typography variant="h3" color="deep-purple">
                  Videos
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-1 p-2">
                  {concepto.links_youtube &&
                    concepto.links_youtube.length !== 0 &&
                    concepto.links_youtube.map((item, itemIndex) => (
                      <Tooltip content={item.video} key={itemIndex}>
                        <div className="bg-pink-50 rounded-2xl hover:shadow-purple-900 shadow-2xl cursor-pointer">
                          {/* 
                          <Typography variant="lead" color="deep-purple">
                            {item.video}
                          </Typography>
                          */}
                          <a href={item.link}>
                            <img
                              src={item.miniatura}
                              alt=""
                              className="h-auto"
                            />
                          </a>
                          {/*
                          <li>{item.miniatura}</li>
                          <li>{item.link}</li>
                           */}
                        </div>
                      </Tooltip>
                    ))}
                </div>
                {/* PARA LOS PDF*/}
                <Typography variant="h3" color="deep-purple" className="mt-6">
                  Informes, libros y articulos
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-1 p-2">
                  {concepto.links_pdf &&
                    concepto.links_pdf.length !== 0 &&
                    concepto.links_pdf.map((item, itemIndex) => (
                      <Tooltip content={item.pdf} key={itemIndex}>
                        <div className="bg-pink-50 rounded-2xl hover:shadow-purple-900 shadow-2xl cursor-pointer">
                          {/* 
                          <Typography variant="lead" color="deep-purple">
                            {item.video}
                          </Typography>
                          */}
                          <a href={item.link}>
                            <img
                              src={item.miniatura}
                              alt=""
                              className="h-auto"
                            />
                          </a>
                          {/*
                          <li>{item.miniatura}</li>
                          <li>{item.link}</li>
                           */}
                        </div>
                      </Tooltip>
                    ))}
                </div>
              </CardBody>
            </Card>
          </Collapse>
          {/* CALCULADORA  DEPENDIENDO DEL ID SE RENDERIZA LA ADECUADA SKERE MODO DIABLO*/}
          <Button
            onClick={toggleOpenCalculadora}
            variant="gradient"
            color="deep-purple"
            className="w-full mt-3"
          >
            CALCULADORA
          </Button>
          <Collapse open={openCalculadora}>
            <Card className="my-4 mx-auto w-full h-full">
              <CardBody>{renderComponent()}</CardBody>
            </Card>
          </Collapse>
        </CardBody>
      </>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"></CardFooter>
    </Card>
  );
}
