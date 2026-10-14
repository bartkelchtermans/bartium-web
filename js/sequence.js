var services = ['Messenger', 'Outlook', 'Netflix', 'Skype', 'Gmail', 'Whatsapp', 'Google Keep', 'Discord',
      'Trello', 'Slack', 'Twitch', 'Spotify', 'Dropbox', 'Plex', 'Soundcloud', 'Evernote', 'Google Docs', 'Onedrive',
      'Flipboard', 'Toggl', 'Speedtest', 'Instagram', 'Google Maps', 'Office 365', 'Duolingo', 'everything'
    ];

    textSequence(0);

    function textSequence(i) {
      if (services.length > i) {
        setTimeout(function () {
          document.getElementById("sequence").innerHTML = services[i];
          textSequence(++i);
        }, 500);

      } else if (services.length == i) {
        // textSequence(0);
      }
    }
