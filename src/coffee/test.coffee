(($) ->

  hid = require 'node-hid'

  devices = do hid.devices
  joys = []

  list = $('#devices')

  addDeviceToDom = (device, index) ->
    li = $('<li></li>')
    li.html "#{device.manufacturer} #{device.product}"
    li.data 'joyId', index
    return list.append li

  for i, device of devices
    try
      deviceHID = new hid.HID device.path

      deviceHID.on 'data', (data) ->
        # This shit does a hard CPU load
        $('#data').html JSON.stringify data

      joys.push
        device: device
        deviceHID: deviceHID
        devicesListElement: addDeviceToDom(device, i)
    catch

  list.on 'click', 'li', (e) ->
    do e.stopPropagation
    joyId = $(this).data 'joyId'
    $('#details').html JSON.stringify joys[joyId].device
    $('#more-details').html JSON.stringify joys[joyId].deviceHID
    do joy.deviceHID.pause for joy in joys
    do joys[joyId].deviceHID.resume
    do $('#data').show

  $('body').on 'click', ->
    do joy.deviceHID.pause for joy in joys
    do $('#data').hide

  $('body').trigger 'click'

) jQuery
