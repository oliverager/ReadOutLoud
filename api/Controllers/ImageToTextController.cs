using api.TransferModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using services;
using System;
using System.Threading.Tasks;

namespace api.Controllers
{
    [ApiController]
    public class ImageToTextController : ControllerBase
    {
        private readonly ILogger<ImageToTextController> _logger;
        private readonly ComputerVisionQuickstart _computerVision;

        public ImageToTextController(ILogger<ImageToTextController> logger, ComputerVisionQuickstart computerVision)
        {
            _logger = logger;
            _computerVision = computerVision;
        }

        [HttpPost]
        [Route("/receiving")]
        public async Task<ResponseDto> Post([FromBody] ScanImagesDto dto)
        {
            try
            {
                // Call the method to extract text from the provided image URL
                var extractedText = await _computerVision.ExtractTextFromUrl(dto.ImgUrl);

                return new ResponseDto()
                {
                    MessageToClient = "Text extracted successfully.",
                    ResponseData = extractedText
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while extracting text from image.");
                return new ResponseDto()
                {
                    MessageToClient = "Error occurred while processing the request."
                };
            }
        }
    }
}