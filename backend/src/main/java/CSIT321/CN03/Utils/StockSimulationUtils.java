package CSIT321.CN03.Utils;

import java.util.Arrays;
import java.util.List;

public class StockSimulationUtils {


    /*
    // Consumables
    public static final List<String> CONSUMABLES_FIRST_WORD = Arrays.asList(
            "Adhesive", "Cleaning", "Sealing", "Waterproofing", "Binding",
            "Protective", "Lubricating", "Disinfectant", "Solvent", "Detergent",
            "Degreasing", "Polishing", "Sanitizing", "Epoxy", "Strengthening",
            "Reacting", "Plastering", "Grouting", "Neutralizing", "Filling"
    );

    public static final List<String> CONSUMABLES_SECOND_WORD = Arrays.asList(
            "Tape", "Glue", "Primer", "Gel", "Paste",
            "Solution", "Spray", "Wrap", "Wipe", "Cloth",
            "Fluid", "Emulsion", "Resin", "Band", "Brush",
            "Foam", "Pouch", "Sheet", "Film", "Rod"
    );

    // Raw Materials
    public static final List<String> RAW_MATERIALS_FIRST_WORD = Arrays.asList(
            "Alkaline", "Acidic", "Neutralizing", "Disinfecting", "Coagulating",
            "Oxidizing", "Reducing", "Precipitating", "Stabilizing", "Calibrating",
            "Chlorinating", "Sedimenting", "Balancing", "Analytical", "Control",
            "Buffered", "Diluting", "Organic", "Inorganic", "Reagent"
    );

    public static final List<String> RAW_MATERIALS_SECOND_WORD = Arrays.asList(
            "Solution", "Agent", "Powder", "Crystal", "Compound",
            "Liquid", "Pellet", "Gas", "Resin", "Suspension",
            "Granule", "Reagent", "Mixture", "Tablet", "Gel",
            "Concentrate", "Acid", "Base", "Salt", "Bead"
    );

    // Equipment
    public static final List<String> EQUIPMENT_FIRST_WORD = Arrays.asList(
            "Filtering", "Measuring", "Testing", "Purifying", "Heating",
            "Cooling", "Mixing", "Distilling", "Grading", "Inspecting",
            "Calibrating", "Sampling", "Analyzing", "Digital", "Handheld",
            "Portable", "Heavy-Duty", "Precision", "Multi-purpose", "Standard"
    );

    public static final List<String> EQUIPMENT_SECOND_WORD = Arrays.asList(
            "Kit", "Device", "Tool", "Apparatus", "Jar",
            "Flask", "Probe", "Gauge", "Thermometer", "Cylinder",
            "Plate", "Vessel", "Pipette", "Meter", "Set",
            "Stand", "Holder", "Spinner", "Tester", "Screen"
    );

    // Machinery
    public static final List<String> MACHINERY_FIRST_WORD = Arrays.asList(
            "Pumping", "Filtration", "Distillation", "Aerating", "Dewatering",
            "Separating", "Purification", "Agitating", "Compacting", "Ionizing",
            "Sterilizing", "Clarifying", "Decanting", "Osmotic", "Evaporative",
            "Gravitational", "Absorption", "Hydraulic", "Mechanical", "Catalytic"
    );

    public static final List<String> MACHINERY_SECOND_WORD = Arrays.asList(
            "System", "Machine", "Unit", "Assembly", "Tower",
            "Station", "Motor", "Compressor", "Centrifuge", "Conveyor",
            "Vat", "Module", "Chamber", "Engine", "Press",
            "Filter", "Generator", "Mixer", "Cooler", "Reactor"
    );
//*/

     // Consumables (Items commonly consumed during computer repair and assembly)
    public static final List<String> CONSUMABLES_FIRST_WORD = Arrays.asList(
            "Thermal", "Cleaning", "Conductive", "Protective", "Adhesive",
            "Lubricating", "Anti-static", "Sealing", "Cooling", "Isopropyl",
            "Degreasing", "Corrosion-resistant", "Organic", "Dielectric", "Binding",
            "Screen", "Surge", "Flux", "Insulating", "Buffered"
    );

    public static final List<String> CONSUMABLES_SECOND_WORD = Arrays.asList(
            "Paste", "Wipe", "Gel", "Tape", "Spray",
            "Solution", "Brush", "Compound", "Foam", "Alcohol",
            "Fluid", "Shield", "Strip", "Band", "Pad",
            "Sheet", "Cable", "Clip", "Wrap", "Guard"
    );

    // Raw Materials (Basic building materials for computer components)
    public static final List<String> RAW_MATERIALS_FIRST_WORD = Arrays.asList(
            "Silicon", "Gold", "Copper", "Plastic", "Graphene",
            "Aluminum", "Ceramic", "Glass", "Tin", "Carbon",
            "Rubber", "Solder", "Nickel", "Magnetic", "Lead",
            "Ferrite", "Zinc", "Phosphor", "Palladium", "Silver"
    );

    public static final List<String> RAW_MATERIALS_SECOND_WORD = Arrays.asList(
            "Wafer", "Wire", "Sheet", "Pellet", "Rod",
            "Foil", "Compound", "Bead", "Strand", "Mesh",
            "Disk", "Coil", "Block", "Plate", "Ribbon",
            "Ring", "Sphere", "Chip", "Grid", "Cube"
    );

    // Equipment (Tools and devices used for computer repairs and diagnostics)
    public static final List<String> EQUIPMENT_FIRST_WORD = Arrays.asList(
            "Digital", "Handheld", "Precision", "Multi-purpose", "Static-free",
            "Magnetic", "Cordless", "Adjustable", "Laser", "Mechanical",
            "Wireless", "Calibrating", "Testing", "Insulating", "Soldering",
            "Anti-static", "Flexible", "USB", "Micro", "Optical"
    );

    public static final List<String> EQUIPMENT_SECOND_WORD = Arrays.asList(
            "Toolset", "Meter", "Probe", "Wrench", "Screwdriver",
            "Tester", "Clip", "Tweezer", "Magnifier", "Spudger",
            "Kit", "Station", "Pen", "Scope", "Light",
            "Platform", "Gun", "Pad", "Stand", "Bracket"
    );

    // Machinery (Larger devices and machines used in the computer production and repair industry)
    public static final List<String> MACHINERY_FIRST_WORD = Arrays.asList(
            "Soldering", "Testing", "Circuit", "3D", "Reflow",
            "Printing", "CNC", "Assembly", "Routing", "Extruding",
            "Injection", "Laminating", "Etching", "Vacuum", "BGA",
            "Mounting", "Cutting", "Punching", "Screen", "UV"
    );

    public static final List<String> MACHINERY_SECOND_WORD = Arrays.asList(
            "Station", "Machine", "Board", "Printer", "Oven",
            "Mill", "Assembler", "Router", "Extruder", "Molder",
            "Press", "Laminator", "Bench", "Chamber", "Caster",
            "Laser", "Cutter", "Table", "Cleaner", "Curer"
    );


    /*
    // Consumables (Items regularly consumed during car repair and maintenance)
    public static final List<String> CONSUMABLES_FIRST_WORD = Arrays.asList(
            "Engine", "Brake", "Transmission", "Radiator", "Windshield",
            "Lubricating", "Cleaning", "Cooling", "Hydraulic", "Diesel",
            "Gasoline", "Air", "Fuel", "Power-steering", "Wiper",
            "Battery", "Protective", "Degreasing", "Sealing", "Polishing"
    );

    public static final List<String> CONSUMABLES_SECOND_WORD = Arrays.asList(
            "Oil", "Fluid", "Cleaner", "Coolant", "Washer",
            "Grease", "Additive", "Filter", "Pad", "Gel",
            "Wax", "Spray", "Sealant", "Tape", "Wrap",
            "Strip", "Guard", "Paste", "Compound", "Foam"
    );

    // Raw Materials (Materials used in the production of car parts)
    public static final List<String> RAW_MATERIALS_FIRST_WORD = Arrays.asList(
            "Steel", "Aluminum", "Rubber", "Copper", "Plastic",
            "Carbon", "Ceramic", "Leather", "Glass", "Zinc",
            "Magnesium", "Fiberglass", "Brass", "Nickel", "Titanium",
            "Silicone", "Foam", "PVC", "Polycarbonate", "Polypropylene"
    );

    public static final List<String> RAW_MATERIALS_SECOND_WORD = Arrays.asList(
            "Sheet", "Bolt", "Gasket", "Tube", "Wire",
            "Belt", "Rod", "Strip", "Plate", "Seal",
            "Disc", "Coil", "Mesh", "Ring", "Pad",
            "Bracket", "Cover", "Shield", "Hose", "Clip"
    );

    // Equipment (Tools and devices used for car repairs and diagnostics)
    public static final List<String> EQUIPMENT_FIRST_WORD = Arrays.asList(
            "Hydraulic", "Diagnostic", "Electric", "Pneumatic", "Digital",
            "Handheld", "Lifting", "Pressure", "Torque", "Alignment",
            "Calibrating", "Battery", "Ignition", "Tire", "Brake",
            "Exhaust", "Fuel", "Oil", "Transmission", "Cooling"
    );

    public static final List<String> EQUIPMENT_SECOND_WORD = Arrays.asList(
            "Jack", "Tester", "Wrench", "Scanner", "Gauge",
            "Pump", "Charger", "Balancer", "Toolset", "Machine",
            "Meter", "Kit", "Stand", "Gun", "Drill",
            "Light", "Compressor", "Vacuum", "Hose", "Probe"
    );

    // Machinery (Larger devices and machines used in the car repair industry)
    public static final List<String> MACHINERY_FIRST_WORD = Arrays.asList(
            "Alignment", "Paint", "Lifting", "Tire", "Welding",
            "Diagnostic", "Brake", "Transmission", "Exhaust", "Battery",
            "Spray", "Air", "Hydraulic", "Cooling", "Engine",
            "Fuel", "Dent", "Electrical", "Pneumatic", "Polishing"
    );

    public static final List<String> MACHINERY_SECOND_WORD = Arrays.asList(
            "Machine", "Booth", "Lift", "Changer", "Machine",
            "Tester", "Lathe", "Press", "Hood", "Charger",
            "Gun", "Compressor", "Bench", "Station", "Analyzer",
            "Pump", "Removal", "Table", "Cleaner", "Grinder"
    );
     */

    public static final List<String> COMMON_FIRST_NAMES = Arrays.asList(
            "John", "Mary", "Robert", "Jennifer", "William",
            "Linda", "David", "Elizabeth", "James", "Susan",
            "Michael", "Patricia", "Richard", "Jessica", "Joseph",
            "Karen", "Thomas", "Nancy", "Charles", "Sarah"
    );

    public static final List<String> COMMON_LAST_NAMES = Arrays.asList(
            "Smith", "Johnson", "Brown", "Davis", "Miller",
            "Wilson", "Moore", "Taylor", "Anderson", "Thomas",
            "Jackson", "White", "Harris", "Martin", "Thompson",
            "Garcia", "Martinez", "Jones", "Williams", "Lee"
    );

    public static final List<String> SUPPLIER_FIRST_NAME = Arrays.asList(
            "Global", "Prime", "Elite", "Superior", "First",
            "Mega", "Ultra", "Alpha", "Peak", "Best",
            "Choice", "Select", "Premium", "Main", "Prime",
            "Top", "Frontier", "Central", "Grand", "Major"
    );

    public static final List<String> SUPPLIER_SECOND_NAME = Arrays.asList(
            "Goods", "Resources", "Supplies", "Products", "Merchants",
            "Trade", "Exports", "Imports", "Deals", "Materials",
            "Marts", "Distribution", "Sourcing", "Retail", "Wholesale",
            "Commodities", "Ware", "Stock", "Assets", "Inventory"
    );
}
