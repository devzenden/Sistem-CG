
import { useEffect, useRef, useMemo } from "react"

export interface BeneficiaryPoint {
  id: string
  name: string
  lat: number
  lng: number
  tipo: string
  tipoId: string   // matches tipo inst filter ids
  beneficiarios: number
  zona: string     // matches zone ids
  distrito: string // matches distrito ids
  status: "activa" | "no_activa"
}

// Datos de ejemplo - reemplazar con datos reales de la DB
const SAMPLE_POINTS: BeneficiaryPoint[] = [
  { id: "1",  name: "COMEDOR SANTA ROSA",              lat: -12.0464, lng: -77.0428, tipo: "COMEDOR",         tipoId: "comedor",         beneficiarios: 120, zona: "lima_centro", distrito: "cercado",             status: "activa"    },
  { id: "2",  name: "OLLA COMUN VILLA EL SALVADOR",    lat: -12.2167, lng: -76.9333, tipo: "OLLA COMUN",      tipoId: "olla_comun",      beneficiarios: 85,  zona: "lima_sur",    distrito: "villa_el_salvador",   status: "activa"    },
  { id: "3",  name: "ALBERGUE SAN JOSE",               lat: -11.9833, lng: -77.1167, tipo: "ALBERGUE",        tipoId: "albergue",        beneficiarios: 200, zona: "lima_norte",  distrito: "los_olivos",          status: "activa"    },
  { id: "4",  name: "COMEDOR LOS OLIVOS",              lat: -11.9667, lng: -77.0667, tipo: "COMEDOR",         tipoId: "comedor",         beneficiarios: 95,  zona: "lima_norte",  distrito: "los_olivos",          status: "activa"    },
  { id: "5",  name: "OLLA COMUN COMAS",                lat: -11.9333, lng: -77.0500, tipo: "OLLA COMUN",      tipoId: "olla_comun",      beneficiarios: 110, zona: "lima_norte",  distrito: "comas",               status: "activa"    },
  { id: "6",  name: "CENTRO COMUNITARIO ATE",          lat: -12.0250, lng: -76.9167, tipo: "ACOMP. SOCIAL",   tipoId: "acomp_social",    beneficiarios: 150, zona: "lima_este",   distrito: "ate",                 status: "activa"    },
  { id: "7",  name: "COMEDOR CHORRILLOS",              lat: -12.1833, lng: -77.0167, tipo: "COMEDOR",         tipoId: "comedor",         beneficiarios: 75,  zona: "lima_sur",    distrito: "chorrillos",          status: "activa"    },
  { id: "8",  name: "ALBERGUE BELLAVISTA",             lat: -12.0667, lng: -77.1167, tipo: "ALBERGUE",        tipoId: "albergue",        beneficiarios: 180, zona: "callao",      distrito: "bellavista",          status: "activa"    },
  { id: "9",  name: "OLLA COMUN SAN JUAN LURIGANCHO",  lat: -12.0000, lng: -76.9833, tipo: "OLLA COMUN",      tipoId: "olla_comun",      beneficiarios: 220, zona: "lima_este",   distrito: "san_juan_lurigancho", status: "activa"    },
  { id: "10", name: "COMEDOR RIMAC",                   lat: -12.0250, lng: -77.0333, tipo: "COMEDOR",         tipoId: "comedor",         beneficiarios: 65,  zona: "lima_centro", distrito: "rimac",               status: "activa"    },
  { id: "11", name: "INTERMEDIARIA MIRAFLORES",        lat: -12.1167, lng: -77.0500, tipo: "INTERMEDIARIA",   tipoId: "intermediaria",   beneficiarios: 300, zona: "lima_centro", distrito: "miraflores",          status: "activa"    },
  { id: "12", name: "COMEDOR CARABAYLLO",              lat: -11.8833, lng: -77.0333, tipo: "COMEDOR",         tipoId: "comedor",         beneficiarios: 90,  zona: "lima_norte",  distrito: "carabayllo",          status: "no_activa" },
  { id: "13", name: "OLLA COMUN VENTANILLA",           lat: -11.8667, lng: -77.1500, tipo: "OLLA COMUN",      tipoId: "olla_comun",      beneficiarios: 135, zona: "callao",      distrito: "ventanilla",          status: "no_activa" },
  { id: "14", name: "SERV. EDUCATIVO SAN BORJA",       lat: -12.1000, lng: -77.0000, tipo: "SERV. EDUCATIVO", tipoId: "serv_educativo",  beneficiarios: 45,  zona: "lima_centro", distrito: "san_borja",           status: "activa"    },
  { id: "15", name: "COMEDOR VILLA MARIA",             lat: -12.1667, lng: -76.9500, tipo: "COMEDOR",         tipoId: "comedor",         beneficiarios: 105, zona: "lima_sur",    distrito: "villa_maria_triunfo", status: "activa"    },
  { id: "16", name: "OLLA COMUN CALLAO",               lat: -12.0600, lng: -77.1300, tipo: "OLLA COMUN",      tipoId: "olla_comun",      beneficiarios: 160, zona: "callao",      distrito: "callao_d",            status: "activa"    },
  { id: "17", name: "COMEDOR SAN MARTIN PORRES",       lat: -12.0200, lng: -77.0900, tipo: "COMEDOR",         tipoId: "comedor",         beneficiarios: 88,  zona: "lima_norte",  distrito: "san_martin_porres",   status: "no_activa" },
  { id: "18", name: "SERV. EDUCATIVO LA MOLINA",       lat: -12.0800, lng: -76.9500, tipo: "SERV. EDUCATIVO", tipoId: "serv_educativo",  beneficiarios: 55,  zona: "lima_este",   distrito: "la_molina",           status: "activa"    },
  { id: "19", name: "COMEDOR INDEPENDENCIA",           lat: -11.9800, lng: -77.0600, tipo: "COMEDOR",         tipoId: "comedor",         beneficiarios: 72,  zona: "lima_norte",  distrito: "independencia",       status: "activa"    },
  { id: "20", name: "ALBERGUE SURCO",                  lat: -12.1500, lng: -76.9900, tipo: "ALBERGUE",        tipoId: "albergue",        beneficiarios: 210, zona: "lima_sur",    distrito: "surco",               status: "no_activa" },
]

const TIPO_COLORS: Record<string, string> = {
  "COMEDOR":         "#16a34a",
  "OLLA COMUN":      "#0ea5e9",
  "ALBERGUE":        "#f59e0b",
  "INTERMEDIARIA":   "#8b5cf6",
  "ACOMP. SOCIAL":   "#ef4444",
  "SERV. EDUCATIVO": "#ec4899",
}

function getColor(tipo: string) {
  return TIPO_COLORS[tipo] ?? "#64748b"
}

export interface MapFilters {
  status: "todos" | "activa" | "no_activa"
  gfnType: "todos" | "comunidades" | "organizacion"
  selectedZones: string[]
  selectedDistritos: string[]
  selectedTipoInst: string[]
}

const comunidadesTypeIds = new Set(["comedor", "olla_comun"])

interface Props {
  filters?: MapFilters
}

export default function BeneficiaryMap({ filters }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  // Filter points based on all active filters
  const filteredPoints = useMemo(() => {
    let pts = SAMPLE_POINTS

    if (filters) {
      const { status, gfnType, selectedZones, selectedDistritos, selectedTipoInst } = filters

      // Status filter
      if (status !== "todos") {
        pts = pts.filter((p) => p.status === status)
      }

      // GFN filter
      if (gfnType === "comunidades") {
        pts = pts.filter((p) => comunidadesTypeIds.has(p.tipoId))
      } else if (gfnType === "organizacion") {
        pts = pts.filter((p) => !comunidadesTypeIds.has(p.tipoId))
      }

      // Zona filter
      if (selectedZones.length > 0) {
        pts = pts.filter((p) => selectedZones.includes(p.zona))
      }

      // Distrito filter
      if (selectedDistritos.length > 0) {
        pts = pts.filter((p) => selectedDistritos.includes(p.distrito))
      }

      // Tipo institucion filter
      if (selectedTipoInst.length > 0) {
        pts = pts.filter((p) => selectedTipoInst.includes(p.tipoId))
      }
    }

    return pts
  }, [filters])

  // Initialize map once
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      const map = L.map(mapRef.current!, {
        center: [-12.05, -77.05],
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: false,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      mapInstanceRef.current = map
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Update markers whenever filteredPoints changes
  useEffect(() => {
    if (!mapInstanceRef.current) return

    import("leaflet").then((L) => {
      const map = mapInstanceRef.current

      // Remove all current markers
      map.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) map.removeLayer(layer)
      })

      // Add filtered markers
      filteredPoints.forEach((point) => {
        const color = getColor(point.tipo)

        const icon = L.divIcon({
          className: "",
          html: `<div style="
            width:14px;height:14px;
            background:${color};
            border:2.5px solid white;
            border-radius:50%;
            box-shadow:0 1px 4px rgba(0,0,0,0.35);
          "></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        })

        const marker = L.marker([point.lat, point.lng], { icon })

        marker.bindPopup(`
          <div style="font-family:sans-serif;min-width:160px;padding:2px 0">
            <p style="font-weight:700;font-size:13px;margin:0 0 6px;color:#111">${point.name}</p>
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
              <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color};flex-shrink:0"></span>
              <span style="font-size:11px;color:#555">${point.tipo}</span>
            </div>
            <div style="font-size:12px;color:#333;display:flex;justify-content:space-between;gap:12px">
              <span>Beneficiarios</span>
              <strong>${point.beneficiarios.toLocaleString()}</strong>
            </div>
            <div style="font-size:11px;color:#888;margin-top:4px;text-transform:capitalize">
              Estado: ${point.status === "activa" ? "Activa" : "No Activa"}
            </div>
          </div>
        `, { maxWidth: 220 })

        marker.addTo(map)
      })
    })
  }, [filteredPoints])

  const visibleTipos = useMemo(() => {
    const tiposEnUso = new Set(filteredPoints.map((p) => p.tipo))
    return Object.entries(TIPO_COLORS).filter(([tipo]) => tiposEnUso.has(tipo))
  }, [filteredPoints])

  return (
    <div className="relative w-full h-72 rounded-lg overflow-hidden">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin="anonymous"
      />
      <div ref={mapRef} className="w-full h-full z-0" />

      {/* Contador de puntos */}
      <div className="absolute top-2 right-2 bg-white/95 rounded-md shadow-md px-2.5 py-1.5 z-[400] text-xs font-semibold text-gray-700">
        {filteredPoints.length} punto{filteredPoints.length !== 1 ? "s" : ""}
      </div>

      {/* Leyenda - solo tipos visibles */}
      <div className="absolute bottom-2 left-2 bg-white/95 rounded-lg shadow-md px-3 py-2 z-[400] text-[10px] space-y-1">
        {visibleTipos.length > 0 ? (
          visibleTipos.map(([tipo, color]) => (
            <div key={tipo} className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-gray-700">{tipo}</span>
            </div>
          ))
        ) : (
          <span className="text-gray-400">Sin resultados</span>
        )}
      </div>
    </div>
  )
}
