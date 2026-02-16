
import { useState, useMemo, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Home,
  Users,
  UserCheck,
  MoreVertical,
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts"

/* -------------------------------------------------- */
/* Reusable Multi-Select Combobox with search          */
/* -------------------------------------------------- */

interface ComboboxOption {
  id: string
  label: string
}

function MultiSelectCombobox({
  label,
  placeholder,
  options,
  selected,
  onToggle,
  onClear,
}: {
  label: string
  placeholder: string
  options: ComboboxOption[]
  selected: string[]
  onToggle: (id: string) => void
  onClear: () => void
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        {label}
      </p>
      <div ref={ref} className="relative">
        {/* Input area with chips */}
        <div
          onClick={() => setOpen(!open)}
          className="min-h-10.5 w-full rounded-lg border-2 border-border bg-card px-2 py-1.5 flex flex-wrap items-center gap-1.5 cursor-pointer hover:border-primary/40 transition-colors"
        >
          {selected.length > 0 ? (
            selected.map((sId) => {
              const opt = options.find((o) => o.id === sId)
              if (!opt) return null
              return (
                <span
                  key={sId}
                  className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium pl-2.5 pr-1 py-1 rounded-md"
                >
                  {opt.label}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggle(sId)
                    }}
                    className="h-4 w-4 rounded-sm hover:bg-primary/20 flex items-center justify-center transition-colors"
                    aria-label={`Quitar ${opt.label}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )
            })
          ) : (
            <span className="text-sm text-muted-foreground px-0.5">{placeholder}</span>
          )}
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground ml-auto shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute z-50 mt-1.5 w-full rounded-lg border border-border bg-card shadow-xl py-1">
            {/* Search input */}
            <div className="px-2 pb-1.5 pt-1">
              <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-2.5 py-1.5">
                <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Buscar..."
                  className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
                />
              </div>
            </div>

            {/* Options */}
            <div className="max-h-48 overflow-y-auto">
              {filtered.length > 0 ? (
                filtered.map((o) => {
                  const isSelected = selected.includes(o.id)
                  return (
                    <button
                      key={o.id}
                      onClick={() => onToggle(o.id)}
                      className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-muted/50 transition-colors"
                    >
                      <span className={isSelected ? "text-foreground font-medium" : "text-muted-foreground"}>
                        {o.label}
                      </span>
                      {isSelected && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  )
                })
              ) : (
                <p className="px-3 py-2.5 text-xs text-muted-foreground">Sin resultados</p>
              )}
            </div>

            {selected.length > 0 && (
              <>
                <div className="border-t border-border my-1" />
                <button
                  onClick={() => {
                    onClear()
                    setOpen(false)
                    setSearch("")
                  }}
                  className="w-full px-3 py-2 text-xs text-primary hover:bg-muted/50 text-left font-medium transition-colors"
                >
                  Limpiar todas
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------- */
/* Data Sets                                           */
/* -------------------------------------------------- */

const dataByStatus = {
  todos: {
    organizaciones: 976,
    beneficiarios: 104822,
    promedio: 107,
    institutionType: [
      { name: "COMEDOR", value: 755, color: "hsl(160, 84%, 39%)" },
      { name: "OLLA COMUN", value: 115, color: "hsl(199, 89%, 48%)" },
      { name: "ALBERGUE", value: 56, color: "hsl(38, 92%, 50%)" },
      { name: "INTERMEDIARIA", value: 26, color: "hsl(246, 65%, 57%)" },
      { name: "ACOMP. SOCIAL", value: 17, color: "hsl(0, 84%, 60%)" },
      { name: "SERV. EDUCATIVO", value: 7, color: "hsl(280, 60%, 55%)" },
    ],
    ageDistribution: [
      { label: "Menor 2 anos", color: "hsl(160, 84%, 39%)", pct: 5 },
      { label: "3-5 anos", color: "hsl(0, 84%, 60%)", pct: 10 },
      { label: "6-11 anos", color: "hsl(38, 92%, 50%)", pct: 17 },
      { label: "12-17 anos", color: "hsl(246, 65%, 57%)", pct: 14 },
      { label: "18-29 anos", color: "hsl(199, 89%, 48%)", pct: 20 },
      { label: "30-59 anos", color: "hsl(210, 40%, 50%)", pct: 26 },
      { label: "60 anos a mas", color: "hsl(0, 0%, 30%)", pct: 8 },
    ],
    orgList: [
      { code: "OA-000057", name: "WESTFALIA KINDERDORF ASOCIACION PERUANA", tipo: "organizacion" },
      { code: "CC-000157", name: "VIRGEN DEL ROSARIO DE TOPARA", tipo: "comunidades" },
      { code: "OS-000046", name: "VILLA SIN FRONTERAS", tipo: "organizacion" },
      { code: "OA-000284", name: "SOLIDARIDAD EN MARCHA", tipo: "organizacion" },
      { code: "CC-000321", name: "SAN JOSE OBRERO", tipo: "comunidades" },
      { code: "OA-000112", name: "FUNDACION NUEVA ESPERANZA", tipo: "organizacion" },
      { code: "CC-000245", name: "ASOCIACION CORAZON SOLIDARIO", tipo: "comunidades" },
      { code: "OS-000089", name: "CENTRO COMUNITARIO LUZ DEL SUR", tipo: "organizacion" },
    ],
    alumbrado: [
      { name: "ELECTRICIDAD CONEXION DIRECTA", value: 753, color: "hsl(45, 93%, 58%)" },
      { name: "ELECTRICIDAD CONEXION EXTERNA", value: 146, color: "hsl(45, 93%, 58%)" },
      { name: "LAMPARA A KEROSENE/LAMP...", value: 4, color: "hsl(45, 93%, 68%)" },
      { name: "NO CUENTAN CON NINGUN T...", value: 89, color: "hsl(45, 93%, 48%)" },
      { name: "PANELES DE ENERGIA SOLAR", value: 4, color: "hsl(45, 93%, 68%)" },
    ],
    abastecimientoAgua: [
      { name: "RED PUB. DENTRO DE LAS INST...", value: 702, color: "hsl(199, 89%, 48%)" },
      { name: "PILON DE USO PUB./AGUA D...", value: 113, color: "hsl(199, 89%, 48%)" },
      { name: "CAMION CISTERNA", value: 103, color: "hsl(199, 70%, 58%)" },
      { name: "RED PUB. FUERA DE LAS INST...", value: 58, color: "hsl(199, 70%, 68%)" },
      { name: "POZO, ACEQUIA, MANANTIAL...", value: 20, color: "hsl(199, 70%, 78%)" },
    ],
    desague: [
      { name: "RED PUB. DE DESAGUE DENT...", value: 707, color: "hsl(210, 50%, 40%)" },
      { name: "A CAMPO ABIERTO/NO TIENE", value: 160, color: "hsl(0, 70%, 55%)" },
      { name: "POZO CIEGO O NEGRO - SILO", value: 74, color: "hsl(210, 50%, 55%)" },
      { name: "RED PUB. DE DESAGUE FUERA...", value: 50, color: "hsl(210, 50%, 65%)" },
      { name: "POZO SEPTICO", value: 5, color: "hsl(210, 50%, 75%)" },
    ],
  },
  activa: {
    organizaciones: 834,
    beneficiarios: 92482,
    promedio: 111,
    institutionType: [
      { name: "COMEDOR", value: 677, color: "hsl(160, 84%, 39%)" },
      { name: "OLLA COMUN", value: 85, color: "hsl(199, 89%, 48%)" },
      { name: "ALBERGUE", value: 41, color: "hsl(38, 92%, 50%)" },
      { name: "INTERMEDIARIA", value: 16, color: "hsl(246, 65%, 57%)" },
      { name: "ACOMP. SOCIAL", value: 11, color: "hsl(0, 84%, 60%)" },
      { name: "SERV. EDUCATIVO", value: 4, color: "hsl(280, 60%, 55%)" },
    ],
    ageDistribution: [
      { label: "Menor 2 anos", color: "hsl(160, 84%, 39%)", pct: 5 },
      { label: "3-5 anos", color: "hsl(0, 84%, 60%)", pct: 10 },
      { label: "6-11 anos", color: "hsl(38, 92%, 50%)", pct: 18 },
      { label: "12-17 anos", color: "hsl(246, 65%, 57%)", pct: 15 },
      { label: "18-29 anos", color: "hsl(199, 89%, 48%)", pct: 20 },
      { label: "30-59 anos", color: "hsl(210, 40%, 50%)", pct: 25 },
      { label: "60 anos a mas", color: "hsl(0, 0%, 30%)", pct: 7 },
    ],
    orgList: [
      { code: "OA-000057", name: "WESTFALIA KINDERDORF ASOCIACION PERUANA", tipo: "organizacion" },
      { code: "CC-000157", name: "VIRGEN DEL ROSARIO DE TOPARA", tipo: "comunidades" },
      { code: "OS-000046", name: "VILLA SIN FRONTERAS", tipo: "organizacion" },
      { code: "OA-000284", name: "SOLIDARIDAD EN MARCHA", tipo: "organizacion" },
      { code: "CC-000321", name: "SAN JOSE OBRERO", tipo: "comunidades" },
    ],
    alumbrado: [
      { name: "ELECTRICIDAD CONEXION DIRECTA", value: 655, color: "hsl(45, 93%, 58%)" },
      { name: "ELECTRICIDAD CONEXION EXTERNA", value: 124, color: "hsl(45, 93%, 58%)" },
      { name: "LAMPARA A KEROSENE/LAMP...", value: 1, color: "hsl(45, 93%, 68%)" },
      { name: "NO CUENTAN CON NINGUN T...", value: 74, color: "hsl(45, 93%, 48%)" },
      { name: "PANELES DE ENERGIA SOLAR", value: 3, color: "hsl(45, 93%, 68%)" },
    ],
    abastecimientoAgua: [
      { name: "RED PUB. DENTRO DE LAS INST...", value: 613, color: "hsl(199, 89%, 48%)" },
      { name: "PILON DE USO PUB./AGUA D...", value: 95, color: "hsl(199, 89%, 48%)" },
      { name: "CAMION CISTERNA", value: 89, color: "hsl(199, 70%, 58%)" },
      { name: "RED PUB. FUERA DE LAS INST...", value: 46, color: "hsl(199, 70%, 68%)" },
      { name: "POZO, ACEQUIA, MANANTIAL...", value: 14, color: "hsl(199, 70%, 78%)" },
    ],
    desague: [
      { name: "RED PUB. DE DESAGUE DENT...", value: 615, color: "hsl(210, 50%, 40%)" },
      { name: "A CAMPO ABIERTO/NO TIENE", value: 136, color: "hsl(0, 70%, 55%)" },
      { name: "POZO CIEGO O NEGRO - SILO", value: 61, color: "hsl(210, 50%, 55%)" },
      { name: "RED PUB. DE DESAGUE FUERA...", value: 42, color: "hsl(210, 50%, 65%)" },
      { name: "POZO SEPTICO", value: 3, color: "hsl(210, 50%, 75%)" },
    ],
  },
  no_activa: {
    organizaciones: 142,
    beneficiarios: 12340,
    promedio: 87,
    institutionType: [
      { name: "COMEDOR", value: 78, color: "hsl(160, 84%, 39%)" },
      { name: "OLLA COMUN", value: 30, color: "hsl(199, 89%, 48%)" },
      { name: "ALBERGUE", value: 15, color: "hsl(38, 92%, 50%)" },
      { name: "INTERMEDIARIA", value: 10, color: "hsl(246, 65%, 57%)" },
      { name: "ACOMP. SOCIAL", value: 6, color: "hsl(0, 84%, 60%)" },
      { name: "SERV. EDUCATIVO", value: 3, color: "hsl(280, 60%, 55%)" },
    ],
    ageDistribution: [
      { label: "Menor 2 anos", color: "hsl(160, 84%, 39%)", pct: 3 },
      { label: "3-5 anos", color: "hsl(0, 84%, 60%)", pct: 8 },
      { label: "6-11 anos", color: "hsl(38, 92%, 50%)", pct: 14 },
      { label: "12-17 anos", color: "hsl(246, 65%, 57%)", pct: 12 },
      { label: "18-29 anos", color: "hsl(199, 89%, 48%)", pct: 22 },
      { label: "30-59 anos", color: "hsl(210, 40%, 50%)", pct: 30 },
      { label: "60 anos a mas", color: "hsl(0, 0%, 30%)", pct: 11 },
    ],
    orgList: [
      { code: "OA-000112", name: "FUNDACION NUEVA ESPERANZA", tipo: "organizacion" },
      { code: "CC-000245", name: "ASOCIACION CORAZON SOLIDARIO", tipo: "comunidades" },
      { code: "OS-000089", name: "CENTRO COMUNITARIO LUZ DEL SUR", tipo: "organizacion" },
    ],
    alumbrado: [
      { name: "ELECTRICIDAD CONEXION DIRECTA", value: 98, color: "hsl(45, 93%, 58%)" },
      { name: "ELECTRICIDAD CONEXION EXTERNA", value: 22, color: "hsl(45, 93%, 58%)" },
      { name: "LAMPARA A KEROSENE/LAMP...", value: 3, color: "hsl(45, 93%, 68%)" },
      { name: "NO CUENTAN CON NINGUN T...", value: 15, color: "hsl(45, 93%, 48%)" },
      { name: "PANELES DE ENERGIA SOLAR", value: 1, color: "hsl(45, 93%, 68%)" },
    ],
    abastecimientoAgua: [
      { name: "RED PUB. DENTRO DE LAS INST...", value: 89, color: "hsl(199, 89%, 48%)" },
      { name: "PILON DE USO PUB./AGUA D...", value: 18, color: "hsl(199, 89%, 48%)" },
      { name: "CAMION CISTERNA", value: 14, color: "hsl(199, 70%, 58%)" },
      { name: "RED PUB. FUERA DE LAS INST...", value: 12, color: "hsl(199, 70%, 68%)" },
      { name: "POZO, ACEQUIA, MANANTIAL...", value: 6, color: "hsl(199, 70%, 78%)" },
    ],
    desague: [
      { name: "RED PUB. DE DESAGUE DENT...", value: 92, color: "hsl(210, 50%, 40%)" },
      { name: "A CAMPO ABIERTO/NO TIENE", value: 24, color: "hsl(0, 70%, 55%)" },
      { name: "POZO CIEGO O NEGRO - SILO", value: 13, color: "hsl(210, 50%, 55%)" },
      { name: "RED PUB. DE DESAGUE FUERA...", value: 8, color: "hsl(210, 50%, 65%)" },
      { name: "POZO SEPTICO", value: 2, color: "hsl(210, 50%, 75%)" },
    ],
  },
}

/* Zone master data by status */

interface ZoneRecord {
  id: string
  label: string
  orgCount: number
  benefCount: number
}

const zonasByStatus: Record<string, ZoneRecord[]> = {
  todos: [
    { id: "callao", label: "CALLAO", orgCount: 146, benefCount: 15100 },
    { id: "lima_centro", label: "LIMA CENTRO", orgCount: 253, benefCount: 27900 },
    { id: "lima_este", label: "LIMA ESTE", orgCount: 208, benefCount: 22500 },
    { id: "lima_norte", label: "LIMA NORTE", orgCount: 228, benefCount: 24200 },
    { id: "lima_sur", label: "LIMA SUR", orgCount: 141, benefCount: 15122 },
  ],
  activa: [
    { id: "callao", label: "CALLAO", orgCount: 124, benefCount: 13200 },
    { id: "lima_centro", label: "LIMA CENTRO", orgCount: 215, benefCount: 24500 },
    { id: "lima_este", label: "LIMA ESTE", orgCount: 178, benefCount: 19800 },
    { id: "lima_norte", label: "LIMA NORTE", orgCount: 196, benefCount: 21400 },
    { id: "lima_sur", label: "LIMA SUR", orgCount: 121, benefCount: 13582 },
  ],
  no_activa: [
    { id: "callao", label: "CALLAO", orgCount: 22, benefCount: 1900 },
    { id: "lima_centro", label: "LIMA CENTRO", orgCount: 38, benefCount: 3400 },
    { id: "lima_este", label: "LIMA ESTE", orgCount: 30, benefCount: 2700 },
    { id: "lima_norte", label: "LIMA NORTE", orgCount: 32, benefCount: 2800 },
    { id: "lima_sur", label: "LIMA SUR", orgCount: 20, benefCount: 1540 },
  ],
}

/* Distrito master data by status */

const distritosByStatus: Record<string, ComboboxOption[]> = {
  todos: [
    { id: "ancon", label: "ANCON" },
    { id: "ate", label: "ATE" },
    { id: "barranco", label: "BARRANCO" },
    { id: "breña", label: "BRENA" },
    { id: "carabayllo", label: "CARABAYLLO" },
    { id: "cercado", label: "CERCADO DE LIMA" },
    { id: "chaclacayo", label: "CHACLACAYO" },
    { id: "chorrillos", label: "CHORRILLOS" },
    { id: "cieneguilla", label: "CIENEGUILLA" },
    { id: "comas", label: "COMAS" },
    { id: "el_agustino", label: "EL AGUSTINO" },
    { id: "independencia", label: "INDEPENDENCIA" },
    { id: "la_molina", label: "LA MOLINA" },
    { id: "la_victoria", label: "LA VICTORIA" },
    { id: "lince", label: "LINCE" },
    { id: "los_olivos", label: "LOS OLIVOS" },
    { id: "lurin", label: "LURIN" },
    { id: "miraflores", label: "MIRAFLORES" },
    { id: "pachacamac", label: "PACHACAMAC" },
    { id: "pucusana", label: "PUCUSANA" },
    { id: "rimac", label: "RIMAC" },
    { id: "san_borja", label: "SAN BORJA" },
    { id: "san_isidro", label: "SAN ISIDRO" },
    { id: "san_juan_lurigancho", label: "SAN JUAN DE LURIGANCHO" },
    { id: "san_juan_miraflores", label: "SAN JUAN DE MIRAFLORES" },
    { id: "san_martin_porres", label: "SAN MARTIN DE PORRES" },
    { id: "san_miguel", label: "SAN MIGUEL" },
    { id: "santa_anita", label: "SANTA ANITA" },
    { id: "surco", label: "SANTIAGO DE SURCO" },
    { id: "surquillo", label: "SURQUILLO" },
    { id: "villa_el_salvador", label: "VILLA EL SALVADOR" },
    { id: "villa_maria_triunfo", label: "VILLA MARIA DEL TRIUNFO" },
    { id: "callao_d", label: "CALLAO" },
    { id: "bellavista", label: "BELLAVISTA" },
    { id: "ventanilla", label: "VENTANILLA" },
  ],
  activa: [
    { id: "ancon", label: "ANCON" },
    { id: "ate", label: "ATE" },
    { id: "barranco", label: "BARRANCO" },
    { id: "breña", label: "BRENA" },
    { id: "carabayllo", label: "CARABAYLLO" },
    { id: "cercado", label: "CERCADO DE LIMA" },
    { id: "chaclacayo", label: "CHACLACAYO" },
    { id: "chorrillos", label: "CHORRILLOS" },
    { id: "cieneguilla", label: "CIENEGUILLA" },
    { id: "comas", label: "COMAS" },
    { id: "el_agustino", label: "EL AGUSTINO" },
    { id: "independencia", label: "INDEPENDENCIA" },
    { id: "la_molina", label: "LA MOLINA" },
    { id: "la_victoria", label: "LA VICTORIA" },
    { id: "lince", label: "LINCE" },
    { id: "los_olivos", label: "LOS OLIVOS" },
    { id: "lurin", label: "LURIN" },
    { id: "miraflores", label: "MIRAFLORES" },
    { id: "pachacamac", label: "PACHACAMAC" },
    { id: "pucusana", label: "PUCUSANA" },
    { id: "rimac", label: "RIMAC" },
    { id: "san_borja", label: "SAN BORJA" },
    { id: "san_isidro", label: "SAN ISIDRO" },
    { id: "san_juan_lurigancho", label: "SAN JUAN DE LURIGANCHO" },
    { id: "san_juan_miraflores", label: "SAN JUAN DE MIRAFLORES" },
    { id: "san_martin_porres", label: "SAN MARTIN DE PORRES" },
    { id: "san_miguel", label: "SAN MIGUEL" },
    { id: "santa_anita", label: "SANTA ANITA" },
    { id: "surco", label: "SANTIAGO DE SURCO" },
    { id: "surquillo", label: "SURQUILLO" },
    { id: "villa_el_salvador", label: "VILLA EL SALVADOR" },
    { id: "villa_maria_triunfo", label: "VILLA MARIA DEL TRIUNFO" },
    { id: "callao_d", label: "CALLAO" },
    { id: "bellavista", label: "BELLAVISTA" },
    { id: "ventanilla", label: "VENTANILLA" },
  ],
  no_activa: [
    { id: "ate", label: "ATE" },
    { id: "cercado", label: "CERCADO DE LIMA" },
    { id: "chorrillos", label: "CHORRILLOS" },
    { id: "comas", label: "COMAS" },
    { id: "el_agustino", label: "EL AGUSTINO" },
    { id: "independencia", label: "INDEPENDENCIA" },
    { id: "la_victoria", label: "LA VICTORIA" },
    { id: "los_olivos", label: "LOS OLIVOS" },
    { id: "rimac", label: "RIMAC" },
    { id: "san_juan_lurigancho", label: "SAN JUAN DE LURIGANCHO" },
    { id: "san_martin_porres", label: "SAN MARTIN DE PORRES" },
    { id: "villa_el_salvador", label: "VILLA EL SALVADOR" },
    { id: "callao_d", label: "CALLAO" },
    { id: "ventanilla", label: "VENTANILLA" },
  ],
}

/* Tipo de Institucion master data by status */

const tipoInstByStatus: Record<string, ComboboxOption[]> = {
  todos: [
    { id: "comedor", label: "COMEDOR" },
    { id: "olla_comun", label: "OLLA COMUN" },
    { id: "albergue", label: "ALBERGUE" },
    { id: "intermediaria", label: "INTERMEDIARIA" },
    { id: "acomp_social", label: "ACOMP. SOCIAL" },
    { id: "serv_educativo", label: "SERV. EDUCATIVO" },
  ],
  activa: [
    { id: "comedor", label: "COMEDOR" },
    { id: "olla_comun", label: "OLLA COMUN" },
    { id: "albergue", label: "ALBERGUE" },
    { id: "intermediaria", label: "INTERMEDIARIA" },
    { id: "acomp_social", label: "ACOMP. SOCIAL" },
    { id: "serv_educativo", label: "SERV. EDUCATIVO" },
  ],
  no_activa: [
    { id: "comedor", label: "COMEDOR" },
    { id: "olla_comun", label: "OLLA COMUN" },
    { id: "albergue", label: "ALBERGUE" },
    { id: "intermediaria", label: "INTERMEDIARIA" },
    { id: "acomp_social", label: "ACOMP. SOCIAL" },
    { id: "serv_educativo", label: "SERV. EDUCATIVO" },
  ],
}

type StatusType = "todos" | "activa" | "no_activa"
type GfnType = "todos" | "comunidades" | "organizacion"

/* -------------------------------------------------- */
/* Main Dashboard Component                            */
/* -------------------------------------------------- */

export function DashBoardSocios() {
  const [filtersOpen, setFiltersOpen] = useState(true)
  const [status, setStatus] = useState<StatusType>("todos")
  const [selectedZones, setSelectedZones] = useState<string[]>([])
  const [selectedDistritos, setSelectedDistritos] = useState<string[]>([])
  const [selectedTipoInst, setSelectedTipoInst] = useState<string[]>([])
  const [gfnType, setGfnType] = useState<GfnType>("todos")
  const [searchQuery, setSearchQuery] = useState("")

  const baseData = dataByStatus[status]
  const availableZones = zonasByStatus[status]
  const availableDistritos = distritosByStatus[status]
  const availableTipoInst = tipoInstByStatus[status]

  const toggleItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    id: string
  ) => {
    setList(list.includes(id) ? list.filter((v) => v !== id) : [...list, id])
  }

  const handleStatusChange = (newStatus: StatusType) => {
    setStatus(newStatus)
  }

  const handleClearAll = () => {
    setStatus("todos")
    setSelectedZones([])
    setSelectedDistritos([])
    setSelectedTipoInst([])
    setGfnType("todos")
    setSearchQuery("")
  }

  // Zone multiplier calculation
  const zoneMultiplier = useMemo(() => {
    if (selectedZones.length === 0) return { orgMultiplier: 1, benefMultiplier: 1 }
    const recs = availableZones.filter((z) => selectedZones.includes(z.id))
    const totalOrgs = recs.reduce((acc, z) => acc + z.orgCount, 0)
    const totalBenef = recs.reduce((acc, z) => acc + z.benefCount, 0)
    return {
      orgMultiplier: totalOrgs / baseData.organizaciones,
      benefMultiplier: totalBenef / baseData.beneficiarios,
    }
  }, [selectedZones, availableZones, baseData])

  // Distrito multiplier (simulated proportional reduction)
  const distritoMultiplier = useMemo(() => {
    if (selectedDistritos.length === 0) return 1
    const totalDistritos = availableDistritos.length
    return selectedDistritos.length / totalDistritos
  }, [selectedDistritos, availableDistritos])

  // GFN multiplier: proportion of institution types shown
  const gfnMultiplier = useMemo(() => {
    if (gfnType === "todos") return 1
    const totalValue = baseData.institutionType.reduce((s, d) => s + d.value, 0)
    let filtered = baseData.institutionType
    if (gfnType === "comunidades") {
      filtered = filtered.filter((d) => ["COMEDOR", "OLLA COMUN"].includes(d.name))
    } else if (gfnType === "organizacion") {
      filtered = filtered.filter((d) => !["COMEDOR", "OLLA COMUN"].includes(d.name))
    }
    const filteredValue = filtered.reduce((s, d) => s + d.value, 0)
    return totalValue > 0 ? filteredValue / totalValue : 1
  }, [gfnType, baseData])

  // Tipo institution multiplier
  const tipoInstMultiplier = useMemo(() => {
    if (selectedTipoInst.length === 0) return 1
    const totalValue = baseData.institutionType.reduce((s, d) => s + d.value, 0)
    const selectedLabels = availableTipoInst
      .filter((t) => selectedTipoInst.includes(t.id))
      .map((t) => t.label)
    const filteredValue = baseData.institutionType
      .filter((d) => selectedLabels.includes(d.name))
      .reduce((s, d) => s + d.value, 0)
    return totalValue > 0 ? filteredValue / totalValue : 1
  }, [selectedTipoInst, availableTipoInst, baseData])

  const stats = useMemo(() => {
    const allMultiplier = zoneMultiplier.orgMultiplier * distritoMultiplier * gfnMultiplier * tipoInstMultiplier
    const allMultiplierBenef = zoneMultiplier.benefMultiplier * distritoMultiplier * gfnMultiplier * tipoInstMultiplier
    const org = Math.round(baseData.organizaciones * allMultiplier)
    const benef = Math.round(baseData.beneficiarios * allMultiplierBenef)
    return {
      organizaciones: org,
      beneficiarios: benef,
      promedio: org > 0 ? Math.round(benef / org) : 0,
    }
  }, [baseData, zoneMultiplier, distritoMultiplier, gfnMultiplier, tipoInstMultiplier])

  // Filter institution chart data by selected tipo and GFN
  const filteredInstitutionData = useMemo(() => {
    let data = baseData.institutionType.map((d) => ({
      ...d,
      value: Math.round(d.value * zoneMultiplier.orgMultiplier * distritoMultiplier),
    }))

    // GFN filter (todos = no filter)
    if (gfnType === "comunidades") {
      data = data.filter((d) => ["COMEDOR", "OLLA COMUN"].includes(d.name))
    } else if (gfnType === "organizacion") {
      data = data.filter((d) => !["COMEDOR", "OLLA COMUN"].includes(d.name))
    }
    // gfnType === "todos" -> show all

    // Tipo Institucion multi-select filter
    if (selectedTipoInst.length > 0) {
      const selectedLabels = availableTipoInst
        .filter((t) => selectedTipoInst.includes(t.id))
        .map((t) => t.label)
      data = data.filter((d) => selectedLabels.includes(d.name))
    }

    return data
  }, [baseData, zoneMultiplier, distritoMultiplier, gfnType, selectedTipoInst, availableTipoInst])

  // Filter org list by search query + GFN type
  const filteredOrgList = useMemo(() => {
    let list = baseData.orgList

    // GFN filter
    if (gfnType === "comunidades") {
      list = list.filter((r) => r.tipo === "comunidades")
    } else if (gfnType === "organizacion") {
      list = list.filter((r) => r.tipo === "organizacion")
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (r) => r.code.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
      )
    }

    return list
  }, [baseData, searchQuery, gfnType])

  // Compute a combined multiplier for all filters
  const combinedMultiplier = useMemo(() => {
    return zoneMultiplier.orgMultiplier * distritoMultiplier * gfnMultiplier * tipoInstMultiplier
  }, [zoneMultiplier, distritoMultiplier, gfnMultiplier, tipoInstMultiplier])

  // Filtered age distribution - apply multipliers to adjust percentages visually
  const filteredAgeDistribution = useMemo(() => {
    return baseData.ageDistribution
  }, [baseData])

  // Filtered infrastructure data
  const filteredAlumbrado = useMemo(() => {
    return baseData.alumbrado.map((item) => ({
      ...item,
      value: Math.max(1, Math.round(item.value * combinedMultiplier)),
    }))
  }, [baseData, combinedMultiplier])

  const filteredAbastecimientoAgua = useMemo(() => {
    return baseData.abastecimientoAgua.map((item) => ({
      ...item,
      value: Math.max(1, Math.round(item.value * combinedMultiplier)),
    }))
  }, [baseData, combinedMultiplier])

  const filteredDesague = useMemo(() => {
    return baseData.desague.map((item) => ({
      ...item,
      value: Math.max(1, Math.round(item.value * combinedMultiplier)),
    }))
  }, [baseData, combinedMultiplier])

  return (
    <div className="flex flex-col gap-5">
      {/* Filters Card */}
      <Card>
        <CardHeader className={filtersOpen ? "pb-0" : "pb-5"}>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-semibold text-card-foreground">Filtros</CardTitle>
            </div>
            {filtersOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </CardHeader>
        {filtersOpen && (
          <CardContent className="pt-4 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
              {/* Estado en BAP */}
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Estado en BAP
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange("todos")}
                    className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                      status === "todos"
                        ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                        : "bg-card text-card-foreground border-border hover:border-primary/40"
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => handleStatusChange("activa")}
                    className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                      status === "activa"
                        ? "bg-[hsl(160,84%,39%)] text-white border-[hsl(160,84%,39%)] shadow-md shadow-[hsl(160,84%,39%)]/20"
                        : "bg-card text-card-foreground border-border hover:border-[hsl(160,84%,39%)]/40"
                    }`}
                  >
                    Activa
                  </button>
                  <button
                    onClick={() => handleStatusChange("no_activa")}
                    className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                      status === "no_activa"
                        ? "bg-[hsl(0,84%,60%)] text-white border-[hsl(0,84%,60%)] shadow-md shadow-[hsl(0,84%,60%)]/20"
                        : "bg-card text-card-foreground border-border hover:border-[hsl(0,84%,60%)]/40"
                    }`}
                  >
                    No Activa
                  </button>
                </div>
              </div>

              {/* Tipo de Institucion segun GFN - 3 toggle buttons */}
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Tipo de Institucion segun GFN
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setGfnType("todos")}
                    className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                      gfnType === "todos"
                        ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                        : "bg-card text-card-foreground border-border hover:border-primary/40"
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setGfnType("comunidades")}
                    className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                      gfnType === "comunidades"
                        ? "bg-foreground text-background border-foreground shadow-md"
                        : "bg-card text-card-foreground border-border hover:border-foreground/40"
                    }`}
                  >
                    Comunidades
                  </button>
                  <button
                    onClick={() => setGfnType("organizacion")}
                    className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                      gfnType === "organizacion"
                        ? "bg-foreground text-background border-foreground shadow-md"
                        : "bg-card text-card-foreground border-border hover:border-foreground/40"
                    }`}
                  >
                    {"Organizacion..."}
                  </button>
                </div>
              </div>

              {/* Buscar por coincidencia */}
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Buscar Organizacion
                </p>
                <div className="flex items-center gap-2 rounded-lg border-2 border-border bg-card px-3 py-2.5 hover:border-primary/40 transition-colors focus-within:border-primary">
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por codigo o nombre..."
                    className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="shrink-0">
                      <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                      <span className="sr-only">Limpiar busqueda</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Zona Lima multi-select combobox */}
              <MultiSelectCombobox
                label="Zona Lima"
                placeholder="Seleccionar zonas..."
                options={availableZones.map((z) => ({ id: z.id, label: z.label }))}
                selected={selectedZones}
                onToggle={(id) => toggleItem(selectedZones, setSelectedZones, id)}
                onClear={() => setSelectedZones([])}
              />

              {/* Distrito multi-select combobox */}
              <MultiSelectCombobox
                label="Distrito"
                placeholder="Seleccionar distritos..."
                options={availableDistritos}
                selected={selectedDistritos}
                onToggle={(id) => toggleItem(selectedDistritos, setSelectedDistritos, id)}
                onClear={() => setSelectedDistritos([])}
              />

              {/* Tipo de Institucion multi-select combobox */}
              <MultiSelectCombobox
                label="Tipo de Institucion"
                placeholder="Seleccionar tipos..."
                options={availableTipoInst}
                selected={selectedTipoInst}
                onToggle={(id) => toggleItem(selectedTipoInst, setSelectedTipoInst, id)}
                onClear={() => setSelectedTipoInst([])}
              />
            </div>

            {/* Limpiar todos los filtros */}
            <div className="flex justify-end mt-5 pt-4 border-t border-border">
              <button
                onClick={handleClearAll}
                className="px-5 py-2 rounded-lg text-sm font-medium text-destructive border-2 border-destructive/30 hover:bg-destructive/10 transition-all"
              >
                Limpiar filtros
              </button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-[hsl(38,92%,50%)]">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-11 w-11 rounded-lg bg-[hsl(38,92%,50%)]/10 flex items-center justify-center shrink-0">
              <Home className="h-5 w-5 text-[hsl(38,92%,50%)]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Organizaciones</p>
              <p className="text-3xl font-bold text-card-foreground">{stats.organizaciones.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[hsl(199,89%,48%)]">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-11 w-11 rounded-lg bg-[hsl(199,89%,48%)]/10 flex items-center justify-center shrink-0">
              <Users className="h-5 w-5 text-[hsl(199,89%,48%)]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Beneficiarios</p>
              <p className="text-3xl font-bold text-card-foreground">{stats.beneficiarios.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[hsl(160,84%,39%)]">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-11 w-11 rounded-lg bg-[hsl(160,84%,39%)]/10 flex items-center justify-center shrink-0">
              <UserCheck className="h-5 w-5 text-[hsl(160,84%,39%)]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Promedio Beneficiarios</p>
              <p className="text-3xl font-bold text-card-foreground">{stats.promedio.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Age Distribution */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-card-foreground uppercase">
            Distribucion Etaria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
            {filteredAgeDistribution.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-[11px] text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="flex h-7 rounded-lg overflow-hidden">
            {filteredAgeDistribution.map((item) => (
              <div
                key={item.label}
                style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                className="transition-all duration-500 relative group"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-white drop-shadow-sm">{item.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main content: 3 cards - Tipo (small) | GPS (wide) | Org Sociales (small) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left: Institution Type Chart */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-card-foreground uppercase">
              Tipo de Institucion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ width: "100%", minHeight: 300 }}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredInstitutionData} layout="vertical" barSize={20}>
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={105}
                    tick={{ fontSize: 10, fill: "hsl(220, 9%, 46%)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(220, 13%, 91%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    cursor={{ fill: "hsl(220, 14%, 96%)" }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} animationDuration={600}>
                    {filteredInstitutionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Center: GPS Map (wider - 2 cols) */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold text-card-foreground uppercase">
              Ubicacion GPS
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Mas opciones</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="relative rounded-lg overflow-hidden bg-muted h-72">
              <iframe
                title="Mapa Lima Peru"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-77.2,-12.3,-76.8,-11.8&layer=mapnik"
                className="w-full h-full border-0"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 bg-card/90 text-[10px] px-2 py-1 rounded shadow text-card-foreground font-medium">
                Grayscale (Light)
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right: Organizaciones Sociales */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-card-foreground uppercase">
              Organizaciones Sociales
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto max-h-85 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-card z-10">
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-3 text-[11px] font-semibold text-primary uppercase tracking-wider">Codigo BAP</th>
                    <th className="text-left p-3 text-[11px] font-semibold text-primary uppercase tracking-wider">Nombre de Org. Social</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrgList.length > 0 ? (
                    filteredOrgList.map((row) => (
                      <tr key={row.code} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                        <td className="p-3 text-card-foreground text-xs font-medium whitespace-nowrap">{row.code}</td>
                        <td className="p-3 text-card-foreground text-xs">{row.name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="p-4 text-center text-xs text-muted-foreground">
                        No se encontraron resultados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Infrastructure Charts: Alumbrado | Abastecimiento de Agua | Desague */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Tipo de Alumbrado */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[hsl(45,93%,58%)]/15 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="hsl(45, 93%, 48%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </svg>
              </div>
              <CardTitle className="text-sm font-semibold text-card-foreground uppercase">
                Tipo de Alumbrado
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {filteredAlumbrado.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground w-35 shrink-0 text-right leading-tight">
                    {item.name}
                  </span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 bg-muted/40 rounded-full h-5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max((item.value / Math.max(filteredAlumbrado[0].value, 1)) * 100, 2)}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-card-foreground w-10 text-right tabular-nums">
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tipo de Abastecimiento de Agua */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[hsl(199,89%,48%)]/15 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="hsl(199, 89%, 48%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M12 2v6" />
                  <path d="M5.2 11.2a8 8 0 1 0 13.6 0" />
                  <path d="M12 2 7 7h10L12 2z" />
                </svg>
              </div>
              <CardTitle className="text-sm font-semibold text-card-foreground uppercase">
                Tipo de Abastecimiento de Agua
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {filteredAbastecimientoAgua.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground w-35 shrink-0 text-right leading-tight">
                    {item.name}
                  </span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 bg-muted/40 rounded-full h-5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max((item.value / Math.max(filteredAbastecimientoAgua[0].value, 1)) * 100, 2)}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-card-foreground w-10 text-right tabular-nums">
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tipo de Desague */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[hsl(210,50%,40%)]/15 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="hsl(210, 50%, 40%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M7 4v16" />
                  <path d="M7 4c0 0 4 0 4 4s-4 4-4 4" />
                  <path d="M7 12c0 0 7 0 7 4s-7 4-7 4" />
                  <path d="M17 4v4" />
                  <path d="M17 12v8" />
                </svg>
              </div>
              <CardTitle className="text-sm font-semibold text-card-foreground uppercase">
                Tipo de Desague
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {filteredDesague.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground w-35 shrink-0 text-right leading-tight">
                    {item.name}
                  </span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 bg-muted/40 rounded-full h-5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max((item.value / Math.max(filteredDesague[0].value, 1)) * 100, 2)}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-card-foreground w-10 text-right tabular-nums">
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
