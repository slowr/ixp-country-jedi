// .format() for strings
// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

// requires files in the right place
// requires jquery to have been loaded
// args:
//   d: d3 data elt
//   jquery_elt: a jquery_elt to put the resulting html at
function jedi_cell_detail_to_jquery_elt(proto, src_id, dst_id, jquery_elt) {
    json_file = "../common/details/{0}/{1}/{2}/latest.json".format(proto, src_id, dst_id);
    $.ajax({
        url: json_file,
        async: true
    }).done(function(data) {
        var txt = '<pre>{0}</pre>'.format(data['tracetxt']);
        if (typeof(data['traixroute']) !== 'undefined') {
            for (var k = 0; k < data['traixroute'].length; k++) {
                txt += '<pre>Name of IXP: <b>{0}</b></br>'.format(data['traixroute'][k]['name']);
                txt += 'IXP on hop: <b>{0}</b></br>'.format(data['traixroute'][k]['hop']);
                txt += 'IXP on the same country? <b>{0}</b></br>'.format(data['traixroute'][k]['in_country']);
                var h = parseInt(data['traixroute'][k]['hop'])
                if(data['traixroute'][k]['link'] == 0)
                    txt += 'Crossing Link: <b>{0}->{1}</b></br>'.format(h,h+1);
                else if(data['traixroute'][k]['link'] == 1)
                    txt += 'Crossing Link: <b>{0}->{1}</b></br>'.format(h+1,h+2);
                else if(data['traixroute'][k]['link'] == 3)
                    txt += 'Crossing Link: <b>{0}->{1}->{2}</b></br>'.format(h,h+1,h+2);
                else 
                    txt += 'Crossing Link: <b>Cannot be determined.</b></br>'
                txt += 'Rule: <b>{0}</b></pre>'.format(data['traixroute'][k]['rule'])
            }
        }
        jquery_elt.html(txt);
    });
}