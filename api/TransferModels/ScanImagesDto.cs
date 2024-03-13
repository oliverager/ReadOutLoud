using System.ComponentModel.DataAnnotations;

namespace api.TransferModels;

public class ScanImagesDto
{
    
    public int ImgId { get; set; }
    [MinLength(5)]
    [Required]
    public string ImgUrl { get; set; }
}