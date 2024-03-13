using System.ComponentModel.DataAnnotations;

namespace api.TransferModels;

public class ScanImagesDto
{
    [MinLength(5)]
    [Required]
    public string ImgUrl { get; set; }
}