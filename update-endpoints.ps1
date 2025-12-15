# Update all API service files to use /electron/ endpoints instead of /secure/

$files = @(
    "src\services\api\cctv\get\get.service.ts",
    "src\services\api\cctv\post\PostCctvFunction.ts",
    "src\services\api\cctv\update\UpdateCctvFunction.ts",
    "src\services\api\cctv\delete\delete.service.ts"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $content = $content -replace '/secure/cctv', '/electron/cctv'
        $content = $content -replace '/secure/layout', '/electron/layout'
        $content = $content -replace '/secure/region', '/electron/region'
        Set-Content $file $content -NoNewline
        Write-Host "Updated: $file"
    } else {
        Write-Host "File not found: $file"
    }
}

Write-Host "`nAll service files updated to use Electron endpoints!"
