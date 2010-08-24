//================================================================
// Global variables
//
// This should really be contained in a namespace, but there are
// time constraints.  Refactor this to an object later
//================================================================

var global_data = Array();
global_data["use_data"] = Array();
global_data["use_case_data"] = Array();
global_data["os_data"] = Array();
global_data["admin_data"] = Array();
global_data["cloud_data"] = Array();
global_data["on_site_data"] = Array();
global_data["virtualization_data"] = Array();

global_input_names =[
    "compute_units",
    "data_storage",
    "mountable_data_storage",
    "bandwidth_inbound",
    "bandwidth_outbound",
    "load_balancers"
]
global_input_status = {};
//================================================================
// Initial state
//
// Fillin based on the selected defaults when the page first loads
//================================================================
function fill_monthly_peak(use, deployment_size) {
    var input_names = [];
    for(var index in global_input_names) {
	var input_name = global_input_names[index];
	if(global_input_status[input_name] != 1) {
	    // console.log("skipping: " + input_name);
	    continue;
	}
	input_names.push(input_name);
    }
    
    var use_data = global_data["use_data"];
    if(!use_data[use]) {
	console.log("no use_data for use:" + use);
	return;
    }

    $.each(input_names, function(index, input_name) {
	var input = $("#" + input_name);
	var raw_value = use_data[use][input_name];
	var modified_value = deployment_size * raw_value;

	input.val(modified_value);
    });
}

//====Get selected values from the dropdowns=================================

function get_selected_use() { return $('#use').val(); }

function get_selected_deployment_size() { return parseFloat($('#deployment_size').val()); }

function get_selected_use_case() { return $('#demand').val(); }

function get_selected_cloud() { return $('#cloud').val(); }

function get_selected_hypervisor() { return $('#hypervisor').val(); }

function get_selected_os() { return $('#os').val(); }

//=====Get amounts from inputs===========================================================

function get_compute_units() { return parseFloat($('#compute_units').val()); }
function get_data_storage_amount() { return parseFloat($('#data_storage').val()); }
function get_mountable_data_storage() { return parseFloat($('#mountable_data_storage').val()); }
function get_bandwidth_inbound() { return parseFloat($('#bandwidth_inbound').val()); }
function get_bandwidth_outbound() { return parseFloat($('#bandwidth_outbound').val()); }
function get_load_balancers() { return parseFloat($('#load_balancers').val()); }


//=====Formula term definitions =============================================

function get_raw_compute_units() { 
    // Gather Data
    var selected_use = get_selected_use();
    
    // Algorithm
    result = get_compute_units();

    // Result
    return result
}

function get_modified_compute_units() {
    // Gather Data
    var deployment_size = get_selected_deployment_size();
    var raw_compute_units = get_raw_compute_units();

    // Algorithm
    result = raw_compute_units * deployment_size;

    // Result
    return parseFloat(result);
}

function get_base_compute_units() {
    // Gather Data
    var compute_units = get_modified_compute_units();
    var selected_use_case = get_selected_use_case();
    
    // Algorithm
    if(selected_use_case == "") { return; }
    var average_base_utilization = parseFloat(global_data["use_case_data"][selected_use_case]["average_base_utilization"]);
    result = Math.ceil(average_base_utilization * compute_units);

    // Result
    return result;
}

function get_unmodified_compute_units() {
    // Gather Data
    var compute_units = get_compute_units();
    var selected_use_case = get_selected_use_case();
    
    // Algorithm
    if(selected_use_case == "") { return; }
    var average_base_utilization = parseFloat(global_data["use_case_data"][selected_use_case]["average_base_utilization"]);
    result = Math.ceil(average_base_utilization * compute_units);

    // Result
    return result;
}

function get_hourly_on_demand_server_cost() {
    return parseFloat(global_data["cloud_data"]["hourly_on-demand_server_cost"][get_selected_cloud()]);
}

function get_monthly_data_storage_cost() {
    return parseFloat(global_data["cloud_data"]["monthly_data_storage_cost"][get_selected_cloud()]);
}

function get_peak_utilization() {
    return parseFloat(global_data["use_case_data"][get_selected_use_case()]["peak_utilization"]);
}

function get_datacenter_cost_per_kw() {
    return parseFloat(global_data["on_site_data"]["datacenter_cost_per_kw"]["on_site"]);
}

function get_cost_per_kwh() {
    return parseFloat(global_data["on_site_data"]["cost_per_kwh"]["on_site"]);
}

function get_kwh_per_compute_unit_hour() {
    return parseFloat(global_data["on_site_data"]["kwh_per_compute_unit_hour"]["on_site"]);
}

function get_up_front_server_cost() {
    return parseFloat(global_data["on_site_data"]["up_front_server_cost"]["on_site"]);
}

function get_network_cost_per_server() {
    return parseFloat(global_data["on_site_data"]["network_cost_per_server"]["on_site"]);
}

function get_virtualization_utilization_ratio_for_cloud() {
    return parseFloat(global_data["cloud_data"]["virtualization_utilization_ratio"][get_selected_cloud()]);
}

function get_hourly_reserved_server_cost() {
    return parseFloat(global_data["cloud_data"]["hourly_reserved_server_cost"][get_selected_cloud()]);
}

function get_virtualization_utilization_ratio_for_on_site() {
    var ratio = parseFloat(global_data["on_site_data"]["virtualization_utilization_ratio"]["on_site"]);
    if(get_selected_hypervisor() == "none") {
	ratio = 5
    }
    return ratio
}

function get_maintenance_costs() {
    return parseFloat(global_data["on_site_data"]["maintenance_cost"]["on_site"]);
}

function get_kwh_per_compute_unit_hour() {
    return parseFloat(global_data["on_site_data"]["kwh_per_compute_unit_hour"]["on_site"]);
}

function get_pue_rating() {
    return parseFloat(global_data["on_site_data"]["pue_rating"]["on_site"]);
}


function get_up_front_network_cost() {
    var compute_units = get_compute_units();
    var utilization  = get_virtualization_utilization_ratio_for_on_site();
    var network_cost_per_server = get_network_cost_per_server();

    return compute_units * utilization * network_cost_per_server;
}
function get_datacenter() {
    var data = global_data["on_site_data"];
    var compute_units = get_compute_units();
    var utilization  = get_virtualization_utilization_ratio_for_on_site();
    var cost_per_kwh = get_datacenter_cost_per_kw();
    var kwh_per_compute = get_kwh_per_compute_unit_hour();

    result = compute_units * utilization * cost_per_kwh * kwh_per_compute;
    return result
}
function get_on_site_virtualization() {
    var software_cost = parseFloat(global_data["virtualization_data"][get_selected_hypervisor()]["on_site"]);
	var os_cost = global_data["os_data"]["up_front"][get_selected_os()]["on_site"];
    var compute_units = get_compute_units();
    var utilization  = get_virtualization_utilization_ratio_for_on_site();
    result = software_cost * compute_units / 2 * utilization;
    return result;	
}

function get_hardware_up_front_costs() {
    var data = global_data["on_site_data"];
    var datacenter = get_datacenter();
    var os = get_on_site_os_cost();
    var virtualization = get_on_site_virtualization();
    var cloud_management = parseFloat(data["cloud_management_up_front_cost"]["on_site"]);
    return parseFloat(datacenter) + parseFloat(os) + parseFloat(virtualization) + parseFloat(cloud_management);
}
function get_new_server() {
    var up_front_server_cost = get_up_front_server_cost();
    var compute_units = get_compute_units();
    var utilization  = get_virtualization_utilization_ratio_for_on_site();
    return up_front_server_cost * compute_units * utilization;
}
function get_new_network() {
    var compute_units = get_compute_units();
    var utilization  = get_virtualization_utilization_ratio_for_on_site();
    var network_cost = get_network_cost_per_server();
    result = compute_units * utilization * network_cost;
    return result;
}
function get_data_storage() {
    var selected_use = get_selected_use();
    var data_storage_amount = get_data_storage_amount();
    var selected_deployment_size = get_selected_deployment_size();
// JLE test
selected_deployment_size = 1;
    result = data_storage_amount * selected_deployment_size;
    return result;
}
function get_mountable_storage() {
    var selected_use = get_selected_use();
    var mountable_storage_amount = get_mountable_data_storage();
    var selected_deployment_size = get_selected_deployment_size();
// JLE test
selected_deployment_size = 1;
    result = parseFloat(mountable_storage_amount * selected_deployment_size);
    return result;
}
function get_new_storage() {
    var data = global_data["on_site_data"];
    var up_front_data_storage = parseFloat(data["up_front_data_storage"]["on_site"]);
    var data_storage = get_data_storage();
    result = data_storage * up_front_data_storage;
    return result;
}
function get_hardware_replacement_costs() {
    var new_server = get_new_server();
    var new_network = get_new_network();
    var new_storage = get_new_storage();
    return parseFloat(new_server) + parseFloat(new_network) + parseFloat(new_storage);
}
function get_cloud_virtualization() {
    var software_cost = parseFloat(global_data["virtualization_data"][get_selected_hypervisor()][get_selected_cloud()]);
    var compute_units = get_modified_compute_units();
    var utilization  = get_virtualization_utilization_ratio_for_cloud();
    result = software_cost * compute_units / 2 * utilization;
    return result;
}
function get_cloud_up_front_costs() {
    var data = global_data["cloud_data"];
    var datacenter = 0;
    var selected_cloud = get_selected_cloud();
    var selected_os = get_selected_os();
    var os = parseFloat(global_data["os_data"]["up_front"][selected_os][selected_cloud]);
    var virtualization = get_cloud_virtualization();
    var cloud_management = parseFloat(data["cloud_management_up_front_cost"][selected_cloud]);
    result = parseFloat(datacenter) + parseFloat(os) + parseFloat(virtualization) + parseFloat(cloud_management);
    return result;
}
function get_cloud_replacement_costs() {return 0;}
function get_on_demand_compute_units() {
    var compute_units = get_compute_units();
    var base_compute_units = get_unmodified_compute_units();
    return compute_units - base_compute_units;
}
function get_compute_hours_full_utilization() {
    var base_compute_units = get_base_compute_units();
    var on_demand_compute_units = get_on_demand_compute_units();
    return (parseFloat(base_compute_units) + parseFloat(on_demand_compute_units)) * 365 * 24; 
}

function get_unmodified_compute_hours_full_utilization() {
    var base_compute_units = get_unmodified_compute_units();
    var on_demand_compute_units = get_on_demand_compute_units();
    return (parseFloat(base_compute_units) + parseFloat(on_demand_compute_units)) * 365 * 24; 
}

function get_reserved_compute_hours() {
    var base_compute_units = get_unmodified_compute_units();
    return parseFloat(base_compute_units) * 365 * 24; 
}
function get_on_demand_compute_hours() {
    var on_demand_compute_units = get_on_demand_compute_units();
    var peak_utilization = get_peak_utilization();
    return parseFloat(on_demand_compute_units) * parseFloat(peak_utilization) * 365 * 24; 
}
function get_compute_hours() {
    return parseFloat(get_reserved_compute_hours() + get_on_demand_compute_hours());
}
function get_on_site_hours_per_scaling_event() {
    var on_site_hours_per_scaling_event = parseFloat(global_data["admin_data"]["hours_per_scaling_event"]["on_site"]);
    return parseFloat(on_site_hours_per_scaling_event);
}
function get_cloud_hours_per_scaling_event() {
    var selected_cloud = get_selected_cloud();
    var cloud_hours_per_scaling_event = parseFloat(global_data["admin_data"]["hours_per_scaling_event"][selected_cloud]);
    return parseFloat(cloud_hours_per_scaling_event);
}
function get_replacement_cycle_total() {
    var up_front_server_cost = get_new_server() * 2; // add in the replacement
    var up_front_network_cost = get_up_front_network_cost() * 2; // add in the replacement
    return parseFloat(up_front_server_cost + up_front_network_cost);
}
function get_total_server_maintenance() {
    var maintenance_costs = get_maintenance_costs();
    var compute_units = get_compute_units();
    var utilization  = get_virtualization_utilization_ratio_for_on_site();
    var up_front_server_cost = get_up_front_server_cost();
    return maintenance_costs * compute_units * utilization * up_front_server_cost;
}
function get_total_network_maintenance() {
    var maintenance_costs = get_maintenance_costs();
    var compute_units = get_compute_units();
    var utilization  = get_virtualization_utilization_ratio_for_on_site();
    var network_cost = get_network_cost_per_server();
    return maintenance_costs * compute_units * utilization * network_cost;
}
function get_hardware_maintenance() {
    var total_server_maintenance = get_total_server_maintenance();
    var total_network_maintenance = get_total_network_maintenance();
    return (parseFloat(total_server_maintenance) * 5) + (parseFloat(total_network_maintenance) * 5);
}
function get_datacenter_power() {
    var compute_hours_full_utilization = get_unmodified_compute_hours_full_utilization();
    var virtualization_utilization_ratio = get_virtualization_utilization_ratio_for_on_site();
    var cost_per_kwh = get_cost_per_kwh();
    var kwh_per_compute_unit_hour = get_kwh_per_compute_unit_hour();
    var pue_rating = get_pue_rating();

    var result = (compute_hours_full_utilization * virtualization_utilization_ratio * kwh_per_compute_unit_hour * cost_per_kwh) * (pue_rating - 1);

    return parseFloat(result);
}
function get_reserved_server() {
    var hourly_reserved_server_cost = get_hourly_reserved_server_cost();
    var reserved_compute_hours = get_reserved_compute_hours();
    return hourly_reserved_server_cost * reserved_compute_hours;
}
function get_on_demand_server() {
    var hourly_on_demand_server_cost = get_hourly_on_demand_server_cost();
    var on_demand_compute_hours = get_on_demand_compute_hours();
    var result = hourly_on_demand_server_cost * on_demand_compute_hours;
    return result;
}
function get_on_site_os_cost() {
	var selected_os = get_selected_os();
	var os_cost = parseFloat(global_data["os_data"]["annual"][selected_os]["on_site"]);
	var compute_units = get_compute_units();
	return os_cost * compute_units;
}
function get_cloud_os_cost() {
	var os = parseFloat(global_data["os_data"]["compute_hour"][get_selected_os()][get_selected_cloud()]);
	return parseFloat(os);
}
function get_up_front_cloud_os_cost() {
	var os = parseFloat(global_data["os_data"]["up_front"][get_selected_os()][get_selected_cloud()]);
	var compute_units = get_compute_units();
	return parseFloat(os * compute_units);
}
function get_annual_cloud_os_cost() {
	var os = parseFloat(global_data["os_data"]["compute_hour"][get_selected_os()][get_selected_cloud()]);
	var compute_hours = get_compute_hours();
	return parseFloat(os * compute_hours);
}
function get_virtualization_cost() {
	var hypervisor_cost = parseFloat(global_data["virtualization_data"][get_selected_hypervisor()]["on_site"]);
	var compute_units = get_compute_units();
	var virtualization = get_virtualization_utilization_ratio_for_on_site();
	return hypervisor_cost * compute_units /2 * virtualization;
}
function get_replacement_cycle() {
	var new_server = get_new_server();
	var up_front_network_cost = get_up_front_network_cost();
	var new_storage = get_new_storage();
	return parseFloat(new_server) + parseFloat(up_front_network_cost) + parseFloat(new_storage);
}
function get_on_site_up_front_cost() {
	var up_front_datacenter_total = get_datacenter();
	var on_site_os_cost = get_on_site_os_cost();
	var virtualization_cost = get_virtualization_cost();
	return parseFloat(up_front_datacenter_total) + parseFloat(on_site_os_cost) + parseFloat(virtualization_cost);
}
function get_total_data_storage() {
	var maintenance_costs = get_maintenance_costs();
	var data_storage = get_data_storage();
	var up_front_data_storage = parseFloat(global_data["on_site_data"]["up_front_data_storage"]["on_site"]);
	return maintenance_costs * data_storage * up_front_data_storage;
}
function get_annual_maintenance_cost() {
	var maintenance_costs = get_maintenance_costs();
	var total_server_maintenance = get_total_server_maintenance();
	var total_network_maintenance = get_total_network_maintenance();
	var total_data_storage = get_total_data_storage();
	return (total_server_maintenance + total_network_maintenance + total_data_storage);
}
function get_on_site_bandwidth_inbound() {
	var inbound_cost_per_gb = parseFloat(global_data["on_site_data"]["inbound_cost_per_gb"]["on_site"]);
	var bandwidth_inbound = get_bandwidth_inbound();
	return inbound_cost_per_gb * bandwidth_inbound * 12;
}
function get_on_site_bandwidth_outbound() {
	var outbound_cost_per_gb = parseFloat(global_data["on_site_data"]["outbound_cost_per_gb"]["on_site"]);
	var bandwidth_outbound = get_bandwidth_outbound();
	return outbound_cost_per_gb * bandwidth_outbound * 12;
}
function get_annual_bandwidth_cost() {
	var on_site_bandwidth_inbound = get_on_site_bandwidth_inbound();
	var on_site_bandwidth_outbound = get_on_site_bandwidth_outbound();
	return on_site_bandwidth_inbound + on_site_bandwidth_outbound;
}
function get_annual_datacenter_power() {
	var compute_hours = get_unmodified_compute_hours_full_utilization();
	var virtualization = get_virtualization_utilization_ratio_for_on_site();
	var cost_per_kwh = get_cost_per_kwh();
	var kwh_per_compute_unit = get_kwh_per_compute_unit_hour();
	var pue_rating = get_pue_rating();
	return compute_hours * virtualization * cost_per_kwh * kwh_per_compute_unit * (pue_rating - 1);
}
function get_server_power() {
	var compute_hours_full_utilization = get_unmodified_compute_hours_full_utilization();
	var virtualization = get_virtualization_utilization_ratio_for_on_site();
	var cost_per_kwh = get_cost_per_kwh();
	var kwh_per_compute_unit = get_kwh_per_compute_unit_hour();
	return compute_hours_full_utilization * virtualization * cost_per_kwh * kwh_per_compute_unit;
}
function get_annual_power_cost() {
	var server_power = get_server_power();
	var annual_data_center_power = get_annual_datacenter_power();
	return server_power + annual_data_center_power;
}
function get_new_deployments() {
	var selected_use_case = get_selected_use_case();
	var new_deployments = parseFloat(global_data["use_case_data"][selected_use_case]["new_deployments"]);
	var hours_per_new_deployment = parseFloat(global_data["admin_data"]["hours_per_new_deployment"]["on_site"]);
	var hourly_cost_per_sys_admin = parseFloat(global_data["admin_data"]["hourly_cost_per_sys_admin"]["on_site"]);
	return new_deployments * hours_per_new_deployment * hourly_cost_per_sys_admin;
}
function get_cloud_new_deployments() {
	var selected_use_case = get_selected_use_case();
	var selected_cloud = get_selected_cloud();
	var new_deployments = parseFloat(global_data["use_case_data"][selected_use_case]["new_deployments"]);
	var hours_per_new_deployment = parseFloat(global_data["admin_data"]["hours_per_new_deployment"][selected_cloud]);
	var hourly_cost_per_sys_admin = parseFloat(global_data["admin_data"]["hourly_cost_per_sys_admin"][selected_cloud]);
	return new_deployments * hours_per_new_deployment * hourly_cost_per_sys_admin;
}
function get_scaling_events () {
	var selected_use_case = get_selected_use_case();
	var scaling_events = parseFloat(global_data["use_case_data"][selected_use_case]["peak_events_per_year"]);
	return scaling_events * 2;
}
function get_admin_scaling_events() {
	var scaling_events = get_scaling_events();
	var hours_per_scaling_event = get_on_site_hours_per_scaling_event();
	var hourly_cost_per_sys_admin = parseFloat(global_data["admin_data"]["hourly_cost_per_sys_admin"]["on_site"]);
	return scaling_events * hours_per_scaling_event * hourly_cost_per_sys_admin;
}
function get_cloud_admin_scaling_events() {
	var scaling_events = get_scaling_events();
	var hours_per_scaling_event = get_cloud_hours_per_scaling_event();
	var hourly_cost_per_sys_admin = parseFloat(global_data["admin_data"]["hourly_cost_per_sys_admin"][get_selected_cloud()]);
	return scaling_events * hours_per_scaling_event * hourly_cost_per_sys_admin;
}
function get_server_equivalents() {
	var compute_units = get_compute_units();
	return compute_units / 4;
}
function get_admin_monitoring() {
	var server_equivalents = get_server_equivalents();
	var servers_per_fte = parseFloat(global_data["admin_data"]["servers_per_fte"]["on_site"]);
	var annual_cost_per_sys_admin = parseFloat(global_data["admin_data"]["annual_cost_per_sys_admin"]["on_site"]);
	return server_equivalents / servers_per_fte * annual_cost_per_sys_admin;
}
function get_cloud_admin_monitoring() {
	var server_equivalents = get_server_equivalents();
	var servers_per_fte = parseFloat(global_data["admin_data"]["servers_per_fte"][get_selected_cloud()]);
	var annual_cost_per_sys_admin = parseFloat(global_data["admin_data"]["annual_cost_per_sys_admin"][get_selected_cloud()]);
	return server_equivalents / servers_per_fte * annual_cost_per_sys_admin;
}
function get_on_site_admin_cost() {
	var new_deployments = get_new_deployments();
	var admin_scaling_events = get_admin_scaling_events();
	var admin_monitoring = get_admin_monitoring();
	return new_deployments + admin_scaling_events + admin_monitoring;
}
function get_on_site_annual_cost() {
	var annual_maintenance_cost = get_annual_maintenance_cost();
	var annual_bandwidth_cost = get_annual_bandwidth_cost();
	var annual_power_cost = get_annual_power_cost();
	var on_site_admin_cost = get_on_site_admin_cost();
	return parseFloat(annual_maintenance_cost) + parseFloat(annual_bandwidth_cost) + parseFloat(annual_power_cost) + parseFloat(on_site_admin_cost);
}
function get_cloud_server_cost() {
	var selected_cloud = get_selected_cloud();
	var reserved_compute_hours = get_reserved_compute_hours();
	var hourly_reserved_server_cost = parseFloat(global_data["cloud_data"]["hourly_reserved_server_cost"][selected_cloud]);
	var on_demand_compute_hours = get_on_demand_compute_hours();
	var hourly_on_demand_server_cost = get_hourly_on_demand_server_cost();
	return reserved_compute_hours * hourly_reserved_server_cost + on_demand_compute_hours * hourly_on_demand_server_cost;
}
function get_cloud_storage_cost() {
	var selected_cloud = get_selected_cloud();
	var monthly_data_storage_cost = get_monthly_data_storage_cost();
	var data_storage = get_data_storage();
	var mountable_storage = get_mountable_storage();
	var mountable_storage_cost = parseFloat(global_data["cloud_data"]["monthly_mountable_storage_cost"][selected_cloud]);
	return data_storage * 12 * monthly_data_storage_cost + mountable_storage * 12 * mountable_storage_cost;
}
function get_cloud_bandwidth_cost() {
	var data = global_data["cloud_data"];
	var selected_cloud = get_selected_cloud();
	var bandwidth_inbound = get_bandwidth_inbound();
	var inbound_bandwidth_cost = parseFloat(data["inbound_cost_per_gb"][selected_cloud]);
	var bandwidth_outbound = get_bandwidth_outbound();
	var outbound_bandwidth_cost = parseFloat(data["outbound_cost_per_gb"][selected_cloud]);
	return bandwidth_inbound * inbound_bandwidth_cost * 12 + bandwidth_outbound * outbound_bandwidth_cost * 12;
}
function get_cloud_management_cost() {
	var cloud_management = parseFloat(global_data["cloud_data"]["cloud_management_up_front_cost"][get_selected_cloud()]);
	return cloud_management;
}
function get_annual_cloud_management_cost() {
	var compute_hours = get_compute_hours();
	return 12 * 500 + Math.max(compute_hours - 30000,0) * .06
}
function get_cloud_admin_cost() {
	var cloud_new_deployments = get_cloud_new_deployments();
	var cloud_admin_scaling_events = get_cloud_admin_scaling_events();
	var cloud_admin_monitoring = get_cloud_admin_monitoring();
	return cloud_new_deployments + cloud_admin_scaling_events + cloud_admin_monitoring;
}
function get_cloud_annual_cost() {
	var cloud_server_cost = get_cloud_server_cost();
	var cloud_storage_cost = get_cloud_storage_cost();
	var cloud_bandwidth_cost = get_cloud_bandwidth_cost();
	var annual_cloud_os_cost = get_annual_cloud_os_cost();
	var annual_cloud_management_cost = get_annual_cloud_management_cost();
	var cloud_admin_cost = get_cloud_admin_cost();
	return cloud_server_cost + cloud_storage_cost + cloud_bandwidth_cost + annual_cloud_os_cost + annual_cloud_management_cost + cloud_admin_cost;
}
function get_total_on_site_costs() {
    var replacement_cycle = get_replacement_cycle();
    var on_site_up_front_cost = get_on_site_up_front_cost();
    var on_site_annual_cost = get_on_site_annual_cost();
    return (replacement_cycle * 2) + parseFloat(on_site_up_front_cost) + (parseFloat(on_site_annual_cost) * 5);
}
function get_total_cloud_costs(){
	var cloud_up_front_costs = get_cloud_up_front_costs();
	var cloud_annual_cost = get_cloud_annual_cost() * 5;
	return parseFloat(cloud_up_front_costs + cloud_annual_cost);
}

// Report functions ==========================================================

function format_percent(raw_number) {
    return Math.round(raw_number * 100);
}

function formatCurrency(num) {
	num = num.toString().replace(/\$|\,/g,'');
	if(isNaN(num))
	num = "0";
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num*100+0.50000000001);
	cents = num%100;
	num = Math.floor(num/100).toString();
	if(cents<10)
	cents = "0" + cents;
	for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	num = num.substring(0,num.length-(4*i+3))+','+
	num.substring(num.length-(4*i+3));
	return (((sign)?'':'-') + '$' + num + '.' + cents);
}

function FormatNumberBy3(num, decpoint, sep) {
  // check for missing parameters and use defaults if so
  if (arguments.length == 2) {
    sep = ",";
  }
  if (arguments.length == 1) {
    sep = ",";
    decpoint = ".";
  }
  // need a string for operations
  num = num.toString();
  // separate the whole number and the fraction if possible
  a = num.split(decpoint);
  x = a[0]; // decimal
  y = a[1]; // fraction
  z = "";


  if (typeof(x) != "undefined") {
    // reverse the digits. regexp works from left to right.
    for (i=x.length-1;i>=0;i--)
      z += x.charAt(i);
    // add seperators. but undo the trailing one, if there
    z = z.replace(/(\d{3})/g, "$1" + sep);
    if (z.slice(-sep.length) == sep)
      z = z.slice(0, -sep.length);
    x = "";
    // reverse again to get back the number
    for (i=z.length-1;i>=0;i--)
      x += z.charAt(i);
    // add the fraction back in, if it was there
    if (typeof(y) != "undefined" && y.length > 0)
      x += decpoint + y;
  }
  return x;
}


function calculate_percent_of_servers() {
    var base_compute_units = get_base_compute_units();
    var on_demand_compute_units = get_modified_compute_units() - base_compute_units;
    var percentage = on_demand_compute_units / (on_demand_compute_units + base_compute_units);
    return format_percent(percentage);
}
function calculate_hardware_cloud_cost_savings() {
    var on_site_hardware_costs = get_hardware_up_front_costs() + get_hardware_replacement_costs();
    var cloud_hardware_costs = get_cloud_up_front_costs() + get_cloud_replacement_costs();
    var hardware_cloud_cost_savings = (on_site_hardware_costs - cloud_hardware_costs);
    var result = hardware_cloud_cost_savings;
	return formatCurrency(result);
}
function calculate_original_server_utilization() {
    var data = global_data["use_case_data"];
    var selected_use_case = get_selected_use_case();
    var average_base_utilization = parseFloat(data[selected_use_case]["average_base_utilization"]);
    var peak_utilization = parseFloat(data[selected_use_case]["peak_utilization"]);
    var average_peak_utilization = parseFloat(data[selected_use_case]["average_peak_utilization"]);
    var percentage = average_base_utilization * (1 - peak_utilization) + average_peak_utilization * peak_utilization;
    return format_percent(percentage);
}
function calculate_cloud_server_utilization() {
    var selected_use_case = get_selected_use_case();
    var average_peak_utilization = parseFloat(global_data["use_case_data"][selected_use_case]["average_peak_utilization"]);
    return format_percent(average_peak_utilization);
}
function calculate_original_facility_cost() {
    var up_front_datacenter_total = get_datacenter();
 	var on_site_os_cost = get_on_site_os_cost();
	var virtualization = get_on_site_virtualization();
    var replacement_cycle_total = get_replacement_cycle_total();
    var hardware_maintenance = get_hardware_maintenance();
    var datacenter_power = get_datacenter_power() * 5;
	var server_power = get_server_power() * 5;
    var compute_hours = get_compute_hours();
    var result = (up_front_datacenter_total + on_site_os_cost + virtualization + replacement_cycle_total + hardware_maintenance + datacenter_power + server_power) / (compute_hours * 5);
	return formatCurrency(result);
}
function calculate_cloud_facility_cost() {
    var reserved_server = get_reserved_server() * 5;
    var on_demand_server = get_on_demand_server() * 5;
    var up_front_cloud_os_cost = get_up_front_cloud_os_cost();
	var annual_cloud_os_cost = get_annual_cloud_os_cost() * 5;
    var compute_hours = get_compute_hours();
    var result = Math.round(((reserved_server + on_demand_server + up_front_cloud_os_cost + annual_cloud_os_cost) / (compute_hours * 5)) * 100)/100;
    return formatCurrency(result);
}
function calculate_server_downtime_hours() {
    var data = global_data["admin_data"];
    var selected_cloud = get_selected_cloud();
    var on_site_downtime_percent = parseFloat(data["downtime_percent_per_year"]["on_site"]);
    var cloud_downtime_percent = parseFloat(data["downtime_percent_per_year"][selected_cloud]);
    var compute_hours_full_utilization = get_unmodified_compute_hours_full_utilization();
	var deployment_size = get_selected_deployment_size();
    return Math.round(((on_site_downtime_percent - cloud_downtime_percent) * (compute_hours_full_utilization * deployment_size)) / deployment_size);
}
function calculate_annual_average_savings() {
    var total_on_site_costs = get_total_on_site_costs();
    var total_cloud_costs = get_total_cloud_costs();
	result = (total_on_site_costs - total_cloud_costs) / 5;
	return formatCurrency(result);
}
function calculate_deployment_time_percentage() {
    var data = global_data["admin_data"];
    var selected_cloud = get_selected_cloud();
    var cloud_hours_per_new_deployment = parseFloat(data["hours_per_new_deployment"][selected_cloud]);
    var on_site_hours_per_new_deployment = parseFloat(data["hours_per_new_deployment"]["on_site"]);
    return format_percent(1 - cloud_hours_per_new_deployment / on_site_hours_per_new_deployment);
}
function calculate_provisioning_time() {
    var on_site_hours_per_scaling_event = get_on_site_hours_per_scaling_event();
    var cloud_hours_per_scaling_event = get_cloud_hours_per_scaling_event();
    return (on_site_hours_per_scaling_event - cloud_hours_per_scaling_event) * 60;
}
function calculate_admin_hours() {
	var data = global_data["admin_data"];
	var selected_cloud = get_selected_cloud();
	var new_deployments = parseFloat(global_data["use_case_data"][get_selected_use_case()]["new_deployments"]);
	var on_site_hours_per_new_deployment = parseFloat(data["hours_per_new_deployment"]["on_site"]);
	var cloud_hours_per_new_deployment = parseFloat(data["hours_per_new_deployment"][selected_cloud]);
	var scaling_events = get_scaling_events();
	var on_site_hours_per_scaling_event = get_on_site_hours_per_scaling_event();
	var cloud_hours_per_scaling_event = get_cloud_hours_per_scaling_event();
	var compute_units = get_compute_units();
	var on_site_servers_per_fte = parseFloat(data["servers_per_fte"]["on_site"]);
	var cloud_servers_per_fte = parseFloat(data["servers_per_fte"][selected_cloud]);

return Math.ceil(new_deployments * (on_site_hours_per_new_deployment - cloud_hours_per_new_deployment) + scaling_events * (on_site_hours_per_scaling_event - cloud_hours_per_scaling_event) + 365 * 24 * (compute_units / 4 / on_site_servers_per_fte - compute_units / 4 / cloud_servers_per_fte))
}

function calculate_monthly_computing_spend() {
    var reserved_server = get_reserved_server();
    var on_demand_server = get_on_demand_server();
    var deployment_size = get_selected_deployment_size();
    var result = Math.round(((reserved_server + on_demand_server)) * 100 / 100);
	return formatCurrency(result);
}
function calculate_monthly_storage_spend() {
    var monthly_data_storage_cost = get_monthly_data_storage_cost();
    var data_storage = get_data_storage();
    var mountable_storage = get_mountable_storage();
	var deployment_size = get_selected_deployment_size();
    var result = (monthly_data_storage_cost * data_storage * 12) + (monthly_data_storage_cost * mountable_storage * 12);
	return formatCurrency(result);
}

//============================================================================
var manual_max = {
    "compute_units":            100000,
    "data_storage":             100000,
    "mountable_data_storage":   100000,
    "bandwidth_inbound":        100000,
    "bandwidth_outbound":       100000,
    "load_balancers":           1000,
    "average_peak_utilization": 100,
    "average_base_utilization": 100,
    "peak_utilization_percent": 100,
    "peak_events_per_year":     1000,
    "new_deployments":          100
}
function manual_override(event) {
    var target = $(event.target);
    var target_id = target[0].id;
    var value = parseFloat(target.val());

    if(0 < value && value < manual_max[target_id]) {
	is_valid = true;
    } else {
	is_valid = false;
    }
    // no longer fill this input
    if(is_valid) {
	global_input_status[target_id] = 0;
	target.addClass("override");
    } else {
	global_input_status[target_id] = 1;
	target.removeClass("override");
    }
    display();
}

function reset_to_default() {
    for(var index in global_input_names) {
	var input_name = global_input_names[index];
	global_input_status[input_name] = 1;
	$('#' + input_name).removeClass("override");
    }

    display();
}

function display() {
    var use = get_selected_use(), 
    deployment_size = get_selected_deployment_size();

    fill_monthly_peak(use, deployment_size);

    var report_values = {
	'percent_of_servers': calculate_percent_of_servers(),
	'hardware_cloud_cost_savings': calculate_hardware_cloud_cost_savings(),
	'original_server_utilization': calculate_original_server_utilization(),
	'cloud_server_utilization': calculate_cloud_server_utilization(),
	'original_facility_cost': calculate_original_facility_cost(),
	'cloud_facility_cost': calculate_cloud_facility_cost(),
	'server_downtime_hours': calculate_server_downtime_hours(),
	'annual_average_savings': calculate_annual_average_savings(),
	'deployment_time_percentage': calculate_deployment_time_percentage(),
	'provisioning_time': calculate_provisioning_time(),
	'admin_hours': calculate_admin_hours(),
	'monthly_computing_spend': calculate_monthly_computing_spend(),
	'monthly_storage_spend': calculate_monthly_storage_spend()
    };


    $.each(report_values, function(key, value) {
	//	console.log(key + ":" + value)
	$('#' + key).text(value);
    });
}


$(function() {
    $("#slider").slider({
	value:1,
	min: 1,
	max: 10,
	step: 1,
	slide: function(event, ui) {
	    $("#deployment_size").val(ui.value);
	    display();
	}
    });
    $("#deployment_size").val($("#slider").slider("value"));
});

//=====Data Loading Functions ===============================================

function load_data(data_from_file, data_object, field_names, top_level_node) {
    $.each($(data_from_file).find("Root").find("Row"), function(index, raw_data) { 
	var data = $(raw_data);
	var key = data.find(top_level_node).text().replace(/ /gi, "_").toLowerCase();

	data_object[key] = Array();
	
    	$.each(field_names, function (index, field_name) {
    	    var value = data.find(field_name).text();
	    var field_name_key = field_name.toLowerCase();
	    //console.log("[" + top_level_node + "] " + "(" + key + ") " + field_name_key + ": " + value);

    	    data_object[key][field_name_key] = value;
    	});

    });
    return data_object;
}

function use_data_load(data_from_file) {
    var field_names = [
	"Compute_Units",
	"Data_Storage",
	"Mountable_Data_Storage",
	"Bandwidth_Inbound",
	"Bandwidth_Outbound",
	"Load_Balancers"
    ]
    var top_level_node = "Uses";
    var data_object = global_data["use_data"];
    return load_data(data_from_file, data_object, field_names, top_level_node);
    reset_to_default();

}

function use_case_data_load(data_from_file) {
    var field_names = ["use_cases", "average_peak_utilization", "average_base_utilization", 
		       "peak_utilization", "peak_events_per_year", "new_deployments"]
    var top_level_node = "use_cases";
    var use_case_data = global_data["use_case_data"];
    var loaded_data = load_data(data_from_file, use_case_data, field_names, top_level_node);

    reset_to_default();

    return loaded_data;
}

function os_pricing_data_load(data_from_file) {
    var field_names = ["timescale", "on_site", "amazon", "rackspace", "go_grid"]
    var top_level_node = "os";
    var os_data = global_data["os_data"];
    return load_data(data_from_file, os_data, field_names, top_level_node);
}

function admin_pricing_data_load(data_from_file) {
    var field_names = ["on_site", "amazon", "rackspace", "go_grid"]
    var top_level_node = "assumption";
    var admin_data = global_data["admin_data"];
    return load_data(data_from_file, admin_data, field_names, top_level_node);
}

function cloud_pricing_data_load(data_from_file) {
    var field_names = ["units", "amazon", "rackspace", "go_grid"]
    var top_level_node = "assumption";
    var cloud_data = global_data["cloud_data"];
    return load_data(data_from_file, cloud_data, field_names, top_level_node);
}

function on_site_assumptions_data_load(data_from_file) {
    var field_names = ["units", "on_site"]
    var top_level_node = "assumption";
    var on_site_data = global_data["on_site_data"];
    return load_data(data_from_file, on_site_data, field_names, top_level_node);
}

function virtualization_pricing_data_load(data_from_file) {
    var field_names = ["timescale","on_site","amazon","rackspace","go_grid"]
    var top_level_node = "hypervisor";
    var virtualization_data = global_data["virtualization_data"];
    return load_data(data_from_file, virtualization_data, field_names, top_level_node);
}
function os_pricing_data_load(data_from_file) {
    global_data["os_data"] = data_from_file;
    return data_from_file;
}

function handle_error(request, status, errorThrown) {
    console.log(errorThrown);
}

//====event handling============================================================

function bind_events () {
    $.each(global_input_names, function(index, input_name) {
	$('#' + input_name).change(manual_override);
    });

    var change_inputs = ["use", "demand", "cloud", "hypervisor", "os"];
    $.each(change_inputs, function(index, input_name) {
	$('#' + input_name).change(display);
    });

    $('#reset_to_default').click(reset_to_default);
}


//===init=============================================================

function init(){
    bind_events();

    $.get("data/admin_pricing_data_table.xml", {}, admin_pricing_data_load, "xml");
    $.get("data/cloud_pricing_data_table.xml", {}, cloud_pricing_data_load, "xml");
    $.get("data/on_site_assumptions_data_table.xml", {}, on_site_assumptions_data_load, "xml");
	$.ajax({url: "data/os_pricing.json", 
	        error: handle_error,
	        success: os_pricing_data_load,
	        dataType: 'json',
	        type: 'GET'
	       });
    $.get("data/use_data_table.xml", {}, use_data_load, "xml");
    $.get("data/virtualization_pricing_data_table.xml", {}, virtualization_pricing_data_load, "xml");
    $.get("data/use_case_data_table.xml", {}, use_case_data_load, "xml");

}

$(document).ready(init)
