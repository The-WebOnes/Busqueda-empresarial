<?php 
class HTMLGenerator
{
    public function generate_Table($Array)
    {
        
        $template = '<div class="table-responsive">';
        $template .= '<table class="table table-bordered">';
        $template .= '<thead>
        <tr>
          <th scope="col" >Titulo</th>
          <th scope="col" >Fragmento</th>
          <th scope="col" >Puntaje</th>
          <th scope="col" >Enlace de descarga</th>
        </tr>
      </thead>
      <tbody>';
        foreach ($Array as $item) {
            $template .= '<tr>';
            $template.= '<td>'.$item['titulo'] .'</td>';
            $template.= '<td>'.$item['snipped'] .'</td>';
            $template.= '<td>'.$item['score'] .'</td>';
            $template.= '<td> <a href="../Server/documents/'.$item['titulo'].'"target="_blank" download='. $item['titulo'] .'>Descargar</a></td>';
            $template .= '</tr>';
         }
         $template .= '
         </tbody>
         </table>
         </div>
         ';
        return $template;
    }
}


?>