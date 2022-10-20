$(function contactMe() {
  /**
   * Updates the DOM
   * @param {*} data XHR result
   */
  function updateContactMe(data) {
    const render = [];
    // Reset all status messages
    $('.contactMe-status').empty();

    // All went well
    if (!data.errors && data.contactMe) {
      console.log("there was no errors in data in js")
      // The input was valid - reset the form
      $('.contact-form').trigger('reset');

      //TODO
      // Output the success message
      $('.contactMe-status').html(`<div class="alert alert-success">${data.successMessage}</div>`);
    } else {
      // There was an error
      console.log("There was an error coming from js")
      // Create a list of errors
      $.each(data.errors, function createHtml(key, error) {
        render.push(`
             <li>${error.msg}</li>
           `);
      });
      // Set the status message
      $('.contactMe-status').html(
        `<div class="alert alert-danger"><ul>${render.join('\n')}</ul></div>`
      );
    }
  }

  /**
   * Attaches to the form and sends the data to our REST endpoint
   */
  $('.contact-form').submit(function submitFeedback(e) {
    console.log("contact form clicked")
    // Prevent the default submit form event
    e.preventDefault();

    // XHR POST request
    $.post(
      '/contactMe/api',
      // Gather all data from the form and create a JSON object from it
      {
        fname: $('#fname').val(),
        lname: $('#lname').val(),
        email: $('#email').val(),
        comment: $('#comment').val()
      },
      // Callback to be called with the data
      updateContactMe,
    );
  });


  function uniqid(random = false) {
    const sec = Date.now() * 1000 + Math.random() * 1000;
    const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
    return `${id}${random ? `.${Math.trunc(Math.random() * 100000000)}` : ""}`;
  };



});
